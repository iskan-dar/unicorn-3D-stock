import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export default function DropdownNav({ category }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [firstCategory, setFirstCategory] = React.useState('');
    const navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setFirstCategory(event.target.innerText.toLowerCase());
    };

    const handleClose = (event) => {
        setAnchorEl(null);

        if (event.target.innerText) {
            const subCategory = event.target.innerText.toString();
            navigate(`/${firstCategory}/${subCategory}`);
        }
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: 'white',
                    cursor: 'pointer',
                    '&:hover': { color: '#1976d2', background: 'white' },
                }}
            >
                {category}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>vehicles</MenuItem>
                <MenuItem onClick={handleClose}>characters</MenuItem>
                <MenuItem onClick={handleClose}>locations</MenuItem>
                <MenuItem onClick={handleClose}>weapons</MenuItem>
            </Menu>
        </div>
    );
}
