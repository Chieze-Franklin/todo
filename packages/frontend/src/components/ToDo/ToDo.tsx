import { useEffect, useState } from 'react';
import todoIcon from '../../assets/todo_icon.png';
import { DEFAULT_GROUP, Task } from '../../types';
import { createTaskWithAI } from '../../utils/ai';
import GroupsDropDown from '../GroupsDropDown';
import ToDoItem from '../ToDoItem';
import sparklesIcon from '../../assets/sparkles.svg';

const ToDo = () => {
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState<Array<Task>>(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : []);
  const [groups, setGroups] = useState<string[]>(localStorage.getItem('groups') ? JSON.parse(localStorage.getItem('groups')!) : []);
  const [selectedGroup, setSelectedGroup] = useState<string>(DEFAULT_GROUP);

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
    const task: Task = {
      id: Date.now(),
      title: text,
      isDone: false,
      deadline: new Date(new Date().setHours(new Date().getHours() + 10)),
      group: selectedGroup
    };
    setTasks([...tasks, task]);
    setInputText('');
  };

  const addTaskUsingAI = (text: string) => {
    if (text.trim() === '') return;
    setLoading(true);
    createTaskWithAI(text, (t) => {
      const task = { ...t, group: selectedGroup };
      setTasks([...tasks, task]);
      setLoading(false);
      setInputText('');
    });
  };

  const deleteGroup = (group: string) => {
    setGroups(groups.filter(g => g !== group));
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const selectGroup = (group: string) => {
    setSelectedGroup(group);
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isDone: !task.isDone } : task));
  }

  const updateTask = (id: number, task: Task) => {
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
        {loading && <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>}
      </div>

      <footer className="flex flex-col my-7 ">
        <div className="flex items-center bg-gray-200 rounded-full">
          <input type="text" placeholder="Describe your task" className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
              value={inputText}
              disabled={loading}
              onChange={(e) => setInputText(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && addTask(inputText)}
          />
          <button className="border-none rounded-full disabled:bg-gray-200 bg-orange-600 w-14 h-14 text-white text-lg font-medium cursor-pointer flex items-center justify-center align-middle" disabled={loading} onClick={() => addTaskUsingAI(inputText)}>
            <img src={sparklesIcon} className='w-8' alt="sparkles" />
          </button>
        </div>
        <p className='text-xs text-slate-600'>Hit "Enter" to create a task manually or the sparkles button to use AI</p>
      </footer>
    </div>
  )
}

export default ToDo;
