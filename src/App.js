import React, { Component } from 'react';

import Arena from 'components/Arena';
import Input from 'components/Input';
import Counter from 'components/Counter';

class App extends Component {

    state = {
        sizeX: 0,
        sizeY: 0,
        arr: [],
        counter: 0
    };

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.sizeX !== this.state.sizeX || prevState.sizeY !== this.state.sizeY)
            && this.state.sizeX !== 0
            && this.state.sizeY !== 0
        ) {
            this.setState({
                arr: this.creatorArray(0)
            });
        }

        if (prevState.arr !== this.state.arr && this.state.arr && this.state.arr !== []) {
            this.calcIsland();
        }
    }

    handlerChangeInput = (value, name) => {
        this.setState({
            [name]: Number(value)
        })
    };

    handlerClickItem = (posX, posY) => {
        const arr = [...this.state.arr];

        arr[posX][posY] = 1;

        this.setState({
            arr: arr
        })
    };

    creatorArray = (value) => {
        const a = [];

        for (let i = 0; i < this.state.sizeX; i++){
            a[i] = [];

            for (let j = 0; j < this.state.sizeY; j++){
                a[i][j] = value;
            }
        }

        return a;
    };

    calcIsland = () => {
        const markedArr = this.creatorArray('');
        let counter = 0;

        const markedFunc = (i, j) => {
            markedArr[i][j] ='x';
            markedArr[i - 1 >= 0 ? i - 1 : i][j] = 'x';
            markedArr[i + 1 < this.state.sizeX ? i + 1 : i][j] = 'x';
            markedArr[i][j - 1 >= 0 ? j - 1 : j] = 'x';
            markedArr[i][j + 1 < this.state.sizeY ? j + 1 : j] = 'x';
        };

        for (let i = 0; i < this.state.arr.length; i++) {
            for (let j = 0; j < this.state.arr[i].length; j++) {
                if (
                    this.state.arr[i][j] === 1 &&
                    markedArr[i][j] !== 'x'
                ) {
                    markedFunc(i, j);
                    counter++;
                } else if (
                    this.state.arr[i][j] === 1 &&
                    markedArr[i][j] === 'x'
                ) {
                    markedFunc(i, j);
                }
            }
        }

        this.setState({
            counter: counter
        })
    };

    render() {


        return (
            <div>
                <div>
                    <Input
                        value={ this.state.sizeX }
                        placeholder={ 'Введите количество строк' }
                        changeFunc={ (value) => this.handlerChangeInput(value, 'sizeX') }
                    />
                    <Input
                        value={ this.state.sizeY }
                        placeholder={ 'Введите количество столбцов' }
                        changeFunc={ (value) => this.handlerChangeInput(value, 'sizeY') }
                    />
                    <Arena
                        items={ this.state.arr }
                        clickFunc={ this.handlerClickItem }
                    />
                    <Counter
                        counter={ this.state.counter }
                    />
                </div>
            </div>
        )
    }
}

export default App;
