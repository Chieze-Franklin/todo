import { AddToCalendarButton } from 'add-to-calendar-button-react';
import { useState } from 'react';
import collapseIcon from '../../assets/collapse.svg';
import deleteIcon from '../../assets/delete.png';
import expandIcon from '../../assets/expand.svg';
import notTickIcon from '../../assets/not_tick.png';
import tickIcon from '../../assets/tick.png';
import { Task } from '../../types';
import GroupsDropDown from '../GroupsDropDown';

export interface Props {
  task: Task;
  groups: string[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, task: Task) => void;
}

const ToDoItem = ({ task, groups, onDelete, onToggle, onUpdate }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectGroup = (group: string) => {
    onUpdate(task.id, { ...task, group });
  }

  const badgeBgColor = (priority?: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-green-200';
      case 'MEDIUM':
        return 'bg-yellow-200';
      case 'HIGH':
        return 'bg-red-200';
      default:
        return 'bg-gray-200';
    }
  }

  const badgeTextColor = (priority?: string) => {
    switch (priority) {
      case 'LOW':
        return 'text-green-600';
      case 'MEDIUM':
        return 'text-yellow-600';
      case 'HIGH':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  return (
    <div className='flex flex-col my-3 gap-2'>
      <div className='flex items-center gap-2'>
          <div className='flex flex-1 items-center cursor-pointer' onClick={() => onToggle(task.id)}>
              <img src={task.isDone ? tickIcon : notTickIcon} alt="check" className='w-7' />
              <p className={`text-slate-700 ml-4 text-[17px] ${task.isDone ? 'line-through' : ''}`}>{task.title}</p>
          </div>
          <div className='flex items-center gap-2'>
              <img src={isExpanded ? collapseIcon : expandIcon} alt="more" className='w-3.5 cursor-pointer' onClick={() => setIsExpanded((prev) => !prev)} />
              <img src={deleteIcon} alt="delete" className='w-3.5 cursor-pointer' onClick={() => onDelete(task.id)} />
          </div>
      </div>
      {isExpanded && (
          <div className='flex flex-col gap-2 pl-10'>
              <p className='text-xs text-slate-600'>{task.description}</p>
              <p className='text-xs text-slate-600'>Deadline: {new Date(task.deadline).toDateString()} {new Date(task.deadline).toTimeString()}</p>
              <div className='flex gap-2'>
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ${badgeBgColor(task.priority)} ${badgeTextColor(task.priority)}`}>{task.priority || 'MEDIUM'}</span>
                <div className='w-full bg-gray-200 rounded-full dark:bg-gray-700'>
                  <div className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full' style={{ width: `${task.progress || 0}%` }}> {task.progress || 0}%</div>
                </div>
              </div>
              <div className='flex gap-2'>
                <GroupsDropDown groups={groups} initialGroup={task.group} onSelectGroup={selectGroup} readonly />
                <AddToCalendarButton
                  name={task.title}
                  startDate={new Date(task.deadline).toISOString()}
                  // end date should be 2 hours after the start date
                  endDate={new Date(new Date(task.deadline).setHours(new Date(task.deadline).getHours() + 1)).toISOString()}
                  // buttonStyle='date'
                  // hideTextLabelButton={true}
                  options={['Apple','Google','Yahoo','iCal', 'Microsoft365', 'MicrosoftTeams', 'Outlook.com']}
                  // pastDateHandling='disable'
                  size='1'
                  timeZone='Europe/Amsterdam'
                ></AddToCalendarButton>
              </div>
          </div>
      )}
    </div>
  )
}

export default ToDoItem;
