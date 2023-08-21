import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Tags() {
  const violations = [
    { title: 'Drunk Driving', points: 5 },
    { title: 'Improper Turn', points: 2 },
    { title: 'Driving', points: 3 },
    { title: 'Speed Driving', points: 3 },
  ];

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={violations}
        getOptionLabel={(option) => option.title}
        defaultValue={[violations[0]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Add violations"
          />
        )}
      />
    </Stack>
  );
}
