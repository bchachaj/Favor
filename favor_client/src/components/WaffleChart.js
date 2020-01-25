import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { ResponsiveWaffleHtml } from '@nivo/waffle';

function colorize(str) {
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    var color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
}

const useStyles = makeStyles(theme => ({
    chartHeight: {
        height: '400px',
        minHeight: '50vh'
    }
}));


const DynamicWaffle = ({ data, chartOptions }) => {
    let total;
    if (chartOptions && chartOptions.value) {
        total = chartOptions.value;
    } else {
        total = 100;
    }

    const colCount = Math.ceil(total / 4);
    const rowCount = Math.ceil(colCount / 5) * 1.05;

    return (<ResponsiveWaffleHtml
        data={data}
        total={total}
        rows={rowCount}
        columns={colCount}
        fillDirection="top"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        emptyColor="#bdccc6"
        colors={{ scheme: 'spectral' }}
        borderColor={{ theme: 'background' }}
        animate={true}
        emptyOpacity={0.55}
        motionStiffness={90}
        motionDamping={11}
    />);
};


export default function WaffleChart({ savedItems, subreddits }) {
    const classes = useStyles();

    const formatWaffleData = (subreddits) => {
        const data = [];
        const subArr = Object.keys(subreddits);

        subArr.forEach((sub) => {
            const subColor = colorize(sub);
            const subId = sub;
            const contentLen = subreddits[sub].length;
            const subValue = contentLen;

            data.push({
                color: subColor,
                id: subId,
                label: sub,
                value: subValue
            })
        });

        const sortedByContentLen = data.sort((x, y) => {
            return y.value - x.value
        });

        return sortedByContentLen;
    };

    const waffleData = formatWaffleData(subreddits);

    let chartOptions;

    if (waffleData.length) {
        chartOptions = {
            total: waffleData.reduce((a, b) => {
                return { value: a.value + b.value };
            })
        }
    }

    return (
        <Card className={classes.chartHeight}>
            <DynamicWaffle data={waffleData} chartOptions={chartOptions} />
        </Card>
    )
}


