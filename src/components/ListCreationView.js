import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
`;

const ListsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin: 20px 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const List = styled.div`
  border: 1px solid #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 60vh;
  overflow-y: auto;
  
  h3 {
    margin: 0 0 16px 0;
    color: #1e293b;
    font-size: 18px;
    position: sticky;
    top: 0;
    background: white;
    padding: 10px 0;
    border-bottom: 1px solid #e2e8f0;
  }

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ListHeader = styled.h3`
  margin: 0 0 16px 0;
  color: #1e293b;
  font-size: 18px;
  position: sticky;
  top: 0;
  background: white;
  padding: 10px 0;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemCount = styled.span`
  background: #e2e8f0;
  color: #475569;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 14px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${props => props.secondary ? '#64748b' : '#0b69ff'};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin: 0 12px;
  
  &:hover {
    background: ${props => props.secondary ? '#475569' : '#1e40af'};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #0b69ff;
  font-size: 20px;
  
  &:hover {
    color: #1e40af;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const ItemContent = styled.div`
  flex: 1;
  padding: 0 10px;
`;

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const ItemDescription = styled.div`
  font-size: 0.9em;
  color: #666;
`;

const ListCreationView = ({ lists, selectedLists, onCancel, onUpdate }) => {
  const selectedListsData = selectedLists.map(num => 
    lists.find(list => list.list_number === num)
  ).filter(Boolean);

  const [firstList, secondList] = selectedListsData;
  
  const [workingLists, setWorkingLists] = useState({
    list1: { ...firstList, items: [...firstList.items] },
    list2: { ...secondList, items: [...secondList.items] },
    newList: {
      list_number: Math.max(...lists.map(l => l.list_number)) + 1,
      items: []
    }
  });

  const moveItem = (from, to, itemId) => {
    setWorkingLists(prev => {
      const newState = {
        list1: { ...prev.list1, items: [...prev.list1.items] },
        list2: { ...prev.list2, items: [...prev.list2.items] },
        newList: { ...prev.newList, items: [...prev.newList.items] }
      };

      const sourceList = newState[from];
      const targetList = newState[to];
      
      const itemIndex = sourceList.items.findIndex(item => item.id === itemId);
      
      if (itemIndex !== -1) {
        const [movedItem] = sourceList.items.splice(itemIndex, 1);
        targetList.items.push({ ...movedItem });
      }

      return newState;
    });
  };

  const handleUpdate = () => {
    const updatedLists = lists.map(list => {
      if (list.list_number === firstList.list_number) {
        return workingLists.list1;
      }
      if (list.list_number === secondList.list_number) {
        return workingLists.list2;
      }
      return list;
    });

    if (workingLists.newList.items.length > 0) {
      updatedLists.push(workingLists.newList);
    }

    onUpdate(updatedLists);
  };

  return (
    <Container>
      <ListsContainer>
        <List>
          <ListHeader>
            List {workingLists.list1.list_number}
            <ItemCount>{workingLists.list1.items.length} items</ItemCount>
          </ListHeader>
          {workingLists.list1.items.map(item => (
            <ItemContainer key={item.id}>
              <ItemContent>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
              <ArrowButton onClick={() => moveItem('list1', 'newList', item.id)}>
                →
              </ArrowButton>
            </ItemContainer>
          ))}
        </List>
        
        <List>
          <ListHeader>
            New List
            <ItemCount>{workingLists.newList.items.length} items</ItemCount>
          </ListHeader>
          {workingLists.newList.items.map(item => (
            <ItemContainer key={item.id}>
              <ArrowButton onClick={() => moveItem('newList', 'list1', item.id)}>
                ←
              </ArrowButton>
              <ItemContent>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
              <ArrowButton onClick={() => moveItem('newList', 'list2', item.id)}>
                →
              </ArrowButton>
            </ItemContainer>
          ))}
        </List>
        
        <List>
          <ListHeader>
            List {workingLists.list2.list_number}
            <ItemCount>{workingLists.list2.items.length} items</ItemCount>
          </ListHeader>
          {workingLists.list2.items.map(item => (
            <ItemContainer key={item.id}>
              <ArrowButton onClick={() => moveItem('list2', 'newList', item.id)}>
                ←
              </ArrowButton>
              <ItemContent>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
            </ItemContainer>
          ))}
        </List>
      </ListsContainer>
      
      <ButtonContainer>
        <Button secondary onClick={onCancel}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ListCreationView;
