import { useEffect, useState } from 'react';
import todoIcon from '../../assets/todo_icon.png';
import ToDoItem from '../ToDoItem';
import { Task } from '../../types';
import GroupsDropDown from '../GroupsDropDown';

const ToDo = () => {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState<Array<Task>>(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : []);
  const [groups, setGroups] = useState<string[]>(localStorage.getItem('groups') ? JSON.parse(localStorage.getItem('groups')!) : []);
  const [selectedGroup, setSelectedGroup] = useState<string>('Default Group');

  useEffect(() => {
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) setGroups(JSON.parse(storedGroups));

    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addGroup = (group: string) => {
    if (group.trim() === '') return;
    if (groups.includes(group)) return;
    setGroups([...groups, group]);
  }

  const addTask = (text: string) => {
    if (text.trim() === '') return;
    const task: Task = { id: Date.now().toString(), text, isComplete: false, deadline: new Date(new Date().setHours(new Date().getHours() + 1)), group: selectedGroup };
    setTasks([...tasks, task]);
    setInputText('');
  };

  const deleteGroup = (group: string) => {
    setGroups(groups.filter(g => g !== group));
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const selectGroup = (group: string) => {
    // if (!group || group === 'Default Group') return setTasks(tasks);
    // setTasks(tasks.filter(task => task.group === group));
    setSelectedGroup(group);
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task));
  }

  const updateTask = (id: string, task: Task) => {
    setTasks(tasks.map(t => t.id === id ? task : t));
  }

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col justify-between p-7 min-h-[550px] rounded-xl'>

      <div>
        <div className="flex items-center mt-7 gap-2">
          <img src={todoIcon} className='w-8' alt="checkmark" />
          <h1 className="text-3xl font-semibold">#ToDo</h1>
          <GroupsDropDown groups={groups} onAddGroup={addGroup} onDeleteGroup={deleteGroup} onSelectGroup={selectGroup} />
        </div>

        <>
          {tasks.filter((t) => !selectedGroup || selectedGroup === t.group).map((task, index) => (
              <ToDoItem key={index} groups={groups} task={task} onDelete={deleteTask} onToggle={toggleTask} onUpdate={updateTask} />
          ))}
        </>
      </div>

      <footer className="flex items-center my-7 bg-gray-200 rounded-full">
        <input type="text" placeholder="Describe your task" className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            // when the user presses the Enter key, the task is added
            onKeyUp={(e) => e.key === 'Enter' && addTask(inputText)}
        />
        <button className="border-none rounded-full bg-orange-600 w-14 h-14 text-white text-lg font-medium cursor-pointer" onClick={() => addTask(inputText)}>+</button>
      </footer>
    </div>
  )
}

export default ToDo;
