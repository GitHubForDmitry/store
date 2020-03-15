import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export const FilterArea = () => {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = name => event => {
        setState({...state, [name]: event.target.checked });
    };

    console.log(state);
    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
                }
                label="Secondary"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedB}
                        onChange={handleChange('checkedB')}
                        value="checkedB"
                        color="primary"
                    />
                }
                label="Primary"
            />
        </FormGroup>
    );
}