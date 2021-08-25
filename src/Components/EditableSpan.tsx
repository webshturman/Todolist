import React, {ChangeEvent, useState,KeyboardEvent} from 'react';

export type EditableSpanPropsType = {
    name: string
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({name}) => {
    let [condition, setCondition] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(name)
    const onEditMode = () => {
        setCondition(true)

    }
    const offEditMode = () => {
        setCondition(false)
    }
    const changeTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value
        if(newTitle.trim()) {
            setTitle(newTitle)
        } else{
            setTitle(title)
        }


    }
    const keyModeHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && title ){
            setCondition(false)
        }
    }
    return (
        <>
            <span onDoubleClick={onEditMode}>
                { condition ?
                    <input
                    type="text"
                    value={title}
                    onBlur={offEditMode}
                    autoFocus={true}
                    onChange={changeTaskName}
                    onKeyPress={keyModeHandler}
                    /> :
                    <span>title</span>
                }
            </span>
        </>
    );
};

