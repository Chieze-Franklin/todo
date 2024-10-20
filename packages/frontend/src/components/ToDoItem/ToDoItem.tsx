import tickIcon from '../../assets/tick.png';
import notTickIcon from '../../assets/not_tick.png';
import deleteIcon from '../../assets/delete.png';
import { Task } from '../../types';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import { useState } from 'react';
import expandIcon from '../../assets/expand.svg';
import collapseIcon from '../../assets/collapse.svg';
import GroupsDropDown from '../GroupsDropDown';

const ToDoItem = ({ task, groups, onDelete, onToggle, onUpdate }: { task: Task, groups: string[], onDelete: (id: string) => void, onToggle: (id: string) => void, onUpdate: (id: string, task: Task) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectGroup = (group: string) => {
    onUpdate(task.id, { ...task, group });
  }

  return (
    <div className='flex flex-col my-3 gap-2'>
      <div className='flex items-center gap-2'>
          <div className='flex flex-1 items-center cursor-pointer' onClick={() => onToggle(task.id)}>
              <img src={task.isComplete ? tickIcon : notTickIcon} alt="check" className='w-7' />
              <p className={`text-slate-700 ml-4 text-[17px] ${task.isComplete ? 'line-through' : ''}`}>{task.text}</p>
          </div>
          <div className='flex items-center gap-2'>
              <img src={isExpanded ? collapseIcon : expandIcon} alt="more" className='w-3.5 cursor-pointer' onClick={() => setIsExpanded((prev) => !prev)} />
              <img src={deleteIcon} alt="delete" className='w-3.5 cursor-pointer' onClick={() => onDelete(task.id)} />
          </div>
      </div>
      {isExpanded && (
          <div className='flex flex-col gap-2 pl-10'>
              <p className='text-xs text-slate-600'>Created on {task.date.toLocaleString()}</p>
              <div className='flex gap-2'>
              <GroupsDropDown groups={groups} initialGroup={task.group} onSelectGroup={selectGroup} readonly />
              <AddToCalendarButton
                name={task.text}
                startDate={new Date(task.date).toISOString()}
                // end date should be 2 hours after the start date
                endDate={new Date(new Date(task.date).setHours(new Date(task.date).getHours() + 1)).toISOString()}
                // buttonStyle='date'
                // hideTextLabelButton={true}
                options={['Apple','Google','Yahoo','iCal', 'Microsoft365', 'MicrosoftTeams', 'Outlook.com']}
                // pastDateHandling='disable'
                size='1'
                timeZone="Europe/Amsterdam"
              ></AddToCalendarButton>
              </div>
          </div>
      )}
    </div>
  )
}

export default ToDoItem;
