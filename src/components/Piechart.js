import { ResponsivePie } from '@nivo/pie';

const theme = {
    fontSize : "20px",
}

const PieChart = ({data}) => (

    <ResponsivePie
        data={data}
        theme={theme}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'category10' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextOffset={13}
        arcLinkLabelsTextColor="#ffffff"
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsThickness={0}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="black"
        legends={[]}
    />
)

export default PieChart;