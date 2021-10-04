import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    name: string
    changeTitle: (title:string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({name,changeTitle}) => {
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
        changeTitle(title)
    }

    const keyModeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            setCondition(false)
            changeTitle(title)
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
                : <span onDoubleClick={onEditMode}>{name}</span>
            }
        </>
    );
});

