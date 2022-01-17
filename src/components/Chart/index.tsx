import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartProps {
  title: string;
  yAxisTitle: string;
  seriesName: string;
  columColor?: string;
  categories: string[];
  data: number[];
  height?: number | string;
  width?: number | string;
};

export function Chart({
  title,
  yAxisTitle,
  seriesName,
  categories,
  data,
  columColor = '#3e6ba7a3',
  height = null,
  width = null,
}: ChartProps) {
  
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: 'column',
          width,
          height,
          borderRadius: 10,
        },
        title: { text: title },
        yAxis: { title: { text: yAxisTitle } },
        xAxis: { categories },
        series: [{ data, name: seriesName }],
        colors: [columColor],
      }}
    />
  );
}
