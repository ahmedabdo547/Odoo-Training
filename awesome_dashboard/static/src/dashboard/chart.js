/** @odoo-module **/

import {
  Component,
  onWillStart,
  useRef,
  onMounted,
  onWillUpdateProps,
  onWillUnmount
} from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class Chart extends Component {
  static template = "awesome_dashboard.Chart";
  static props = {
    data: { type: Object },
    type: { type: String }, // 'pie' أو 'bar' أو 'line'
    label: { type: String, optional: true },
  };

  setup() {
    this.canvasRef = useRef("canvas");
    this.chart = null;

    onWillStart(async () => {
      await loadJS("/web/static/lib/Chart/Chart.js");
    });

    onMounted(() => {
      this.renderChart();
    });

    onWillUpdateProps((nextProps) => {
      if (this.chart) {
        this.chart.data.datasets[0].data = Object.values(nextProps.data);
        this.chart.update();
      }
    });

    onWillUnmount(() => {
      if (this.chart) {
        this.chart.destroy();
      }
    });
  }

  renderChart() {
    this.chart = new window.Chart(this.canvasRef.el, {
      type: this.props.type,
      data: {
        labels: Object.keys(this.props.data),
        datasets: [
          {
            label: this.props.label || "",
            data: Object.values(this.props.data),
            backgroundColor:
              this.props.type === "pie"
                ? ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"]
                : "#714B67",
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }
}
