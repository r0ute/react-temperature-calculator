import React, {Component} from 'react';

const boilingPoint = 100;
const scales = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function BoilingVerdict(props) {
    return <p>The water would {props.celcius < boilingPoint && 'not'} boil.</p>
}

function TemperatureInput(props) {
    return (
        <fieldset>
            <legend>Enter temperature in {props.scale}:</legend>
            <input data-scale={props.scale} value={props.temperature} onChange={props.onTemperatureChange}/>
        </fieldset>
    );
}

export default class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            temperature: '',
            scale: scales.c
        };
    }

    handleTemperatureChange = (event) => {
        this.setState({
            temperature: event.target.value,
            scale: event.target.getAttribute('data-scale')
        });
    };

    render() {
        const celsius = this.state.scale === scales.c ? this.state.temperature : convertTemperature(this.state.temperature, toCelsius);
        const fahrenheit = this.state.scale === scales.f ? this.state.temperature : convertTemperature(this.state.temperature, toFahrenheit);

        return (
            <div>
                <TemperatureInput
                    temperature={celsius}
                    scale={scales.c}
                    onTemperatureChange={this.handleTemperatureChange}/>
                <TemperatureInput
                    temperature={fahrenheit}
                    scale={scales.f}
                    onTemperatureChange={this.handleTemperatureChange}/>
                <BoilingVerdict celcius={celsius}/>
            </div>
        );
    }
}

function convertTemperature(temperature, converter) {
    const temp = parseFloat(temperature);

    if (isNaN(temp)) {
        return '';
    }

    return Math.round(converter(temp) * 1000 / 1000).toString();
}

function toCelsius(fahrenheit) {
    // T(°c) = (T(°f) - 32) / 1.8
    return (fahrenheit - 32) / 1.8;
}

function toFahrenheit(celsius) {
    // T(°f) = T(°c) × 1.8 + 32
    return celsius * 1.8 + 32;
}