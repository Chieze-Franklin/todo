import { useState } from "react";
import deleteIcon from '../../assets/delete.png';

const GroupsDropDown = ({ groups, initialGroup, readonly, onAddGroup, onDeleteGroup, onSelectGroup }: { groups: string[], initialGroup?: string, readonly?: boolean, onAddGroup?: (group: string) => void, onDeleteGroup?: (group: string) => void, onSelectGroup?: (group: string) => void }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(initialGroup);

  const addGroup = () => {
    const group = prompt('Enter group name');
    if (group && onAddGroup) onAddGroup(group);
  }

  const selectGroup = (group: string) => {
    setShowDropDown(false);
    setSelectedGroup(group);
    if (onSelectGroup) onSelectGroup(group);
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true"
          onClick={() => setShowDropDown((prev) => !prev)}
        >
          {selectedGroup ? selectedGroup : 'Default Group'}
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {showDropDown && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
        <div className="py-1" role="none">
          {!readonly && <button type="button" className="inline-flex w-11/12 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 m-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" tabIndex={-1} onClick={addGroup}>Add Group</button>}
          <a className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 ${!selectedGroup || selectedGroup === 'Default Group' ? 'bg-orange-300' : ''}`} tabIndex={-1} role="menuitem" id={`menu-item-default`} onClick={() => selectGroup('Default Group')}>Default Group</a>
          {groups.map((group, index) => (
            <div key={index} className={`flex w-full justify-between items-center pr-2 hover:bg-gray-50 ${selectedGroup === group ? 'bg-orange-300' : ''}`}  onClick={() => selectGroup(group)}>
              <a key={index} className="block px-4 py-2 text-sm text-gray-700" tabIndex={-1} role="menuitem" id={`menu-item-${index}`}>{group}</a>
              {!readonly && <img src={deleteIcon} alt="delete" className='w-3.5 cursor-pointer' onClick={() => onDeleteGroup && onDeleteGroup(group)} />}
            </div>
          ))}
        </div>
      </div>}
    </div>
  )
}

export default GroupsDropDown;
