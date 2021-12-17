import { ResponsivePie } from '@nivo/pie'

const theme = {
      "fontSize": 20,
}


const CustomPieChart = ({data}) => (

      <ResponsivePie
      theme={theme}
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'category10' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextOffset={0}
      arcLinkLabelsTextColor="white"
      arcLinkLabelsStraightLength={14}
      arcLinkLabelsThickness={0}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="black"
      legends={[]}
      tooltip={() => (
      <div></div>
            )}
/>
)

export default CustomPieChart;