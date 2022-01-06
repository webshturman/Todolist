import React from "react";
// @ts-ignore
import { create } from "react-test-renderer";
import Task from "./Task";
import {Provider} from "react-redux";
import {store} from "../../state/store";


export const renderComponent = (component:any) =>{
    return create(<Provider store={store}>{component}</Provider>)
}
//используем describe, для объединения нескольких тестов в одну группу
//it или test не имеет значения

describe("ProfileStatus component", () => {
    test("ID should be in state", () => {
        const component = renderComponent(<Task TaskID={'123456'} TodolistID={'5588899'}/>);
        const instance = component.getInstance();
        expect(instance.state.TaskID).toBe('123456');
        // expect(instance.state.isAuth).toBe(true);
    });
});