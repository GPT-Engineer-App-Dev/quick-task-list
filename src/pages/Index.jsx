import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isComplete: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleRemoveTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="lg"
        mb={4}
      />
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTask}>
        Add Task
      </Button>
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <ListIcon
              as={task.isComplete ? FaCheckCircle : FaRegCircle}
              color={task.isComplete ? 'green.500' : 'gray.500'}
              cursor="pointer"
              onClick={() => handleToggleComplete(task.id)}
            />
            <Box flex="1" as="span" ml={2} textDecoration={task.isComplete ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <IconButton
              icon={<FaTrash />}
              colorScheme="red"
              onClick={() => handleRemoveTask(task.id)}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;