import React, { useState, useEffect } from 'react';
import { TableCell, TextField } from '@mui/material';

const EditableCell = ({ value: initialValue, row: rowIndex, column: columnKey, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleDoubleClick = () => {
        setEditing(true);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleBlur = () => {
        setEditing(false);
        if (initialValue !== value) {
            onUpdate(rowIndex, columnKey, value);
        }
    };

    return editing ? (
        <TableCell align="left" component="th" scope="row" >
            <TextField
                fullWidth
                autoFocus
                multiline
                rows={4}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    '& .MuiInputBase-input': { // Target the input element for styling
                        fontFamily: 'Inter',
                        fontWeight: '400',
                    },
                }}
            />
        </TableCell>
    ) : (
        <TableCell onDoubleClick={handleDoubleClick} sx={{
            fontFamily: 'Inter',
            fontWeight: '400'
        }}>{value}</TableCell>
    );
};

export default EditableCell;
