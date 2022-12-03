import React, { Component } from "react";
import ReactDOM from "react-dom";
import SeatPicker from "react-seat-picker";

// TODO: link existing rows with the seats map from Reservations.js

export default class TablePick  extends Component {
  state = {
    loading: false
  };

  addSeatCallback = ({ row, number, id }, addCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        const newTooltip = `tooltip for id-${id} added by callback`;
        addCb(row, number, id, newTooltip);
        this.setState({ loading: false });
      }
    );
  };

  addSeatCallbackContinousCase = (
    { row, number, id },
    addCb,
    params,
    removeCb
  ) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        if (removeCb) {
          await new Promise((resolve) => setTimeout(resolve, 750));
          console.log(
            `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
          );
          removeCb(params.row, params.number);
        }
        await new Promise((resolve) => setTimeout(resolve, 750));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        const newTooltip = `tooltip for id-${id} added by callback`;
        addCb(row, number, id, newTooltip);
        this.setState({ loading: false });
      }
    );
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        this.setState({ loading: false });
      }
    );
  };
//   let Row = this.props.parentToChild;

  render() {

    
    const rows = [
      [
        {
          id: 1,
          number: 1,
          isSelected: true,
          tooltip: "Reserved by you",
          orientation: "east"
        },
        { id: 2, number: 2, tooltip: "Cost: 15$", orientation: "west" },
        null,
        {
          id: 3,
          number: "3",
          isReserved: true,
          orientation: "east",
          tooltip: "Reserved by Rogger"
        },
        { id: 4, number: "4", orientation: "west" },
        null,
        { id: 5, number: 5, orientation: "east" },
        { id: 6, number: 6, orientation: "west" }
      ],
      [
        {
          id: 7,
          number: 7,
          isReserved: true,
          tooltip: "Reserved by Matthias Nadler",
          orientation: "east"
        },
        { id: 8, number: 8, isReserved: true, orientation: "west" },
        null,
        { id: 9, number: "9", isReserved: true, orientation: "east" },
        { id: 10, number: "10", orientation: "west" },
        null,
        { id: 11, number: 11, orientation: "east" },
        { id: 12, number: 12, orientation: "west" }
      ],
      [],
      [
        { id: 13, number: 13, orientation: "east" },
        { id: 14, number: 14, orientation: "west" },
        null,
        { id: 15, number: 15, isReserved: true, orientation: "east" },
        { id: 16, number: "16", orientation: "west" },
        null,
        { id: 17, number: 17, orientation: "east" },
        { id: 18, number: 18, orientation: "west" }
      ],
      [
        { id: 19, number: 19, tooltip: "Cost: 25$", orientation: "east" },
        { id: 20, number: 20, orientation: "west" },
        null,
        { id: 21, number: 21, orientation: "east" },
        { id: 22, number: "22", orientation: "west" },
        null,
        { id: 23, number: 23, orientation: "east" },
        { id: 24, number: 24, orientation: "west" }
      ],
      [],
      [
        { id: 25, number: 25, isReserved: true, orientation: "east" },
        { id: 26, number: 26, orientation: "west" },
        null,
        { id: 27, number: "27", isReserved: true, orientation: "east" },
        { id: 28, number: "28", orientation: "west" },
        null,
        { id: 29, number: 29, tooltip: "Cost: 11$", orientation: "east" },
        { id: 30, number: 30, isReserved: true, orientation: "west" }
      ],
      [
        { id: 31, number: 31, orientation: "east" },
        { id: 32, number: 32, orientation: "west" },
        null,
        { id: 33, number: "33", isReserved: true, orientation: "east" },
        { id: 34, number: "34", orientation: "west" },
        null,
        { id: 35, number: 35, tooltip: "Cost: 11$", orientation: "east" },
        { id: 36, number: 36, isReserved: true, orientation: "west" }
      ]
    ];
    const { loading } = this.state;
    return (
      <div>
        {console.log(this.props.parentToChild)}
        <h1>Available Seating</h1>
        <div style={{ marginTop: "100px" }}>
          <SeatPicker
            addSeatCallback={this.addSeatCallbackContinousCase}
            removeSeatCallback={this.removeSeatCallback}
            rows={rows}
            maxReservableSeats={1}
            alpha
            visible
            selectedByDefault
            loading={loading}
            tooltipProps={{ multiline: true }}
            continuous
          />
        </div>
      </div>
    );
  }
}
