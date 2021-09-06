import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    name: string
    refreshingTitle: (title:string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({name,refreshingTitle}) => {
    let [condition, setCondition] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(name)


    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        setCondition(true)
        // setTitle(name)
    }
    const offEditMode = () => {
        setCondition(false)
        refreshingTitle(title)
    }

    const keyModeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            setCondition(false)
            refreshingTitle(title)
        }
    }

    return (
        <>
            {condition ?
                <TextField  type="text"
                            value={title}
                            onBlur={offEditMode}
                            autoFocus={true}
                            onChange={changeTitleHandler}
                            onKeyPress={keyModeHandler}>

                </TextField>
                // <input
                //     type="text"
                //     value={title}
                //     onBlur={offEditMode}
                //     autoFocus={true}
                //     onChange={changeTitleHandler}
                //     onKeyPress={keyModeHandler}/>
                : <span onDoubleClick={onEditMode}>{name}</span>
            }
        </>
    );
};

