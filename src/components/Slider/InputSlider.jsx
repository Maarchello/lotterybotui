import React, {useState} from 'react';
import {Box, Grid, Input, Slider, Typography} from "@mui/material";

const InputSlider = ({callback}) => {

    const [value, setValue] = useState(100);
    const handleSliderChange = (event) => {
        setValue(parseInt(event.target.value))
        callback(value);
    }

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
        callback(value);
    };

    return (
        <Box>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs>

                    <Slider onChange={handleSliderChange} min={1} max={100000} step={100} value={value} defaultValue={100} aria-label="Default" valueLabelDisplay="auto" />
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
                            max: 50000,
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