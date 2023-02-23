import React, { useState } from 'react';
import UserComponent from './UserComponent';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

function App() {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Banana',
    },
    {
      id: '2',
      name: 'Kimchi',
    },
    {
      id: '3',
      name: 'Potato',
    },
    {
      id: '4',
      name: 'New Jeans',
    },
    {
      id: '5',
      name: 'Apple',
    },
    {
      id: '6',
      name: 'Orange',
    },
    {
      id: '7',
      name: 'Pineapple',
    },
    {
      id: '8',
      name: 'Watermelon',
    },
    {
      id: '9',
      name: 'Grapes',
    },
    {
      id: '10',
      name: 'Pear',
    },
    {
      id: '11',
      name: 'Peach',
    },
    {
      id: '12',
      name: 'Cherry',
    },
    {
      id: '13',
      name: 'Blueberry',
    },
    {
      id: '14',
      name: 'Mango',
    },
    {
      id: '15',
      name: 'Lemon',
    },
    {
      id: '16',
      name: 'Lime',
    },
  ]);

  const sensors = [useSensor(PointerSensor)];

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div
      style={{
        marginTop: '20px',
        margin: 'auto',
        width: '300px',
        height: '300px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '10px',
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((item) => item.id)}>
          {items.map((item) => (
            <UserComponent {...item} key={item.id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
