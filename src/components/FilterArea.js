import React, {memo, useContext} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AppContext from "../context/AppContext";



function CheckboxLabels() {

    const { handleChange, state } = useContext(AppContext);

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange('checkedA')}
                        value="checkedA"
                        color="primary"
                    />
                }
                label="SizeA"
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
                label="SizeB"
            />
        </FormGroup>
    );
}

export default memo(CheckboxLabels)