import { ResponsivePie } from '@nivo/pie';

const theme = {
    fontSize : "20px",
}

const PieChart = ({data}) => (

<ResponsivePie
        theme={theme}
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.4}
        padAngle={1}
        cornerRadius={4}
        activeInnerRadiusOffset={5}
        activeOuterRadiusOffset={5}
        colors={{ scheme: 'category10' }}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.3' ] ] }}
        enableArcLinkLabels={true}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="white"
        arcLinkLabelsThickness={0}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabel={function(e){return e.value}}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 10 ] ] }}
        motionConfig="default"
    />
)

export default PieChart;