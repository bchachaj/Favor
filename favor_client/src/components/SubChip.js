import React, { memo } from 'react';
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

export default memo(function SubChip({ sub, linkArrLen, isActive, toggleChipFilter }) {
        return (
        <Chip
          clickable
          label={sub}
          size="medium"
          color={isActive ? "secondary" : "primary"}
          count={linkArrLen}
          onClick={() => toggleChipFilter(sub)}
          avatar={<Avatar>{linkArrLen}</Avatar>}
        />
    );
})
