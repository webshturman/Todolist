import {multSalary, summSalary} from "./tasks";


test('find out new salary', ()=>{
    //входные данные
        const sum = 500
        const add = 100

    //выполнние тестируемого кода
        const newSalary = summSalary(sum, add)

    //ожидаемый результат
        expect(newSalary).toBe(600)
})

test('find out new multsalary', ()=>{
        //ожидаемый результат
        expect(multSalary(500, 10)).toBe(600)
})