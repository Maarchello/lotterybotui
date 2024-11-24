import React, {useState} from 'react';
import {Box, Grid, Input, Slider, Typography} from "@mui/material";

const InputSlider = ({callback}) => {

    const [value, setValue] = useState(100);
    const handleSliderChange = (event) => {
        let newValue = parseInt(event.target.value);
        setValue(newValue)
        callback(newValue);
    }

    const handleInputChange = (event) => {
        let newValue = event.target.value === '' ? 0 : Number(event.target.value);
        setValue(newValue);
        callback(newValue);
    };

    return (
        <Box>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs>

                    <Slider onChange={handleSliderChange} min={1} max={5000} step={100} value={value} defaultValue={100} aria-label="Default" valueLabelDisplay="auto" />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        // onBlur={handleBlur}
                        inputProps={{
                            step: 100,
                            min: 1,
                            max: 5000,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default InputSlider;