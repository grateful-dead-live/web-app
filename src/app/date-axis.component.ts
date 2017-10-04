import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { DeadEvent } from './dead-api.service';

@Component({
  selector: 'date-axis',
  template: '<div mdTooltip="{{tooltipText}}" mdTooltipPosition="above" class="d3-visuals" #visuals (window:resize)="onResize($event)"></div>',
  providers: []
})
export class DateAxis implements OnInit, OnChanges {
  @ViewChild('visuals') private visualsContainer: ElementRef;
  @Input() private events: DeadEvent[];
  @Input() private onClick: Function;
  private margins = { top: 0, bottom: 0, left: 10, right: 10};
  private element;
  private svg;
  private width;
  private height = 100;
  private dateScale;
  private dateAxis;
  private tooltipText = "";

  ngOnInit() {
    this.init();
  }

  private init() {
    if (!this.svg) {
      this.element = this.visualsContainer.nativeElement;
      this.updateWidth();
      this.svg = d3.select(this.element).append('svg')
        .attr('width', this.element.offsetWidth)
        .attr('height', this.height)
        .style("background-color", "black");
      this.updateVisuals();
    }
  }

  private updateWidth() {
    this.width = this.element.offsetWidth - this.margins.left - this.margins.right;
  }

  private updateVisuals() {
    this.updateAxis();
    this.updateDateLines();
  }

  private updateDateLines() {
    if (this.events) {
      let dataSelection = this.svg.selectAll(".path").data(this.events);
      let triangle = d3.symbol().type(d3.symbolStar).size(()=>2000);
      let lineFunction = d3.line()
        .x(d => d.x)
        .y(d => d.y)

      var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      dataSelection.enter()
        .append("path")
        .attr("d", lineFunction([{ "x": 0, "y": 0}, { "x": 0, "y": 70}]))
        .attr("transform", e => "translate("+this.eventToDatePoint(e)+","+0+")")
        .style("stroke", e => "hsl("+this.eventToDatePoint(e)+", 80%, 50%)")
        .attr("stroke-width", 2)
        .style("opacity", 0.5)
        .on("click", e => this.onClick(e))
        .on("mouseover", d => this.tooltipText = d.date+" "+d.location)
        .on("mouseout", d => this.tooltipText = "")
          .transition()
            .duration(200) // time of initial growth

        dataSelection
          .transition()
            .duration(200) // time of transition

        dataSelection.exit().remove();
    }
  }

  private updateDateTriangles() {
    if (this.events) {
      let dataSelection = this.svg.selectAll(".path").data(this.events);
      let triangle = d3.symbol().type(d3.symbolTriangle).size(()=>800);

      dataSelection.enter()
        .append("path")
        .attr("d", triangle)
        .attr("transform", e => "translate("+this.eventToDatePoint(e)+","+this.height/2+")")
        .style("fill", e => "hsl("+this.eventToDatePoint(e)+", 80%, 50%)")
        //.style("opacity", 0.3)
        .on("click", e => this.onClick(e))
        .transition()
          .duration(200) // time of initial growth

      dataSelection
        .transition()
          .duration(200) // time of transition

      dataSelection.exit().remove();
    }
  }

  private updateDateCircles() {
    if (this.events) {
      let dataSelection = this.svg.selectAll(".circle").data(this.events);

      dataSelection.enter()
        .append("circle")
        .attr("cy", 20)
        .attr("cx", this.eventToDatePoint)
        .attr("r", () => 0)
        .style("fill", e => "hsl("+this.eventToDatePoint(e)+", 80%, 50%)")
        .style("opacity", 0.3)
        .on("click", e => this.onClick(e))
        .transition()
          .duration(200) // time of initial growth
          .attr("cx", this.eventToDatePoint)
          .attr("r", () => 8);

      dataSelection
        .transition()
          .duration(200) // time of transition
          //.style("fill", this.getHsl)
          //.style("opacity", 0.3)
          .attr("cx", this.eventToDatePoint);

      dataSelection.exit().remove();
    }
  }

  eventToDatePoint = (event: DeadEvent) => this.dateScale(new Date(Date.parse(event.date)));

  private updateAxis() {
    if (!this.dateScale) {
      this.dateScale = d3.scaleTime()
        .domain([new Date(1965, 1, 1), new Date(1995, 12, 31)])
        .range([this.margins.left, this.width]);
      this.dateAxis = d3.axisBottom(this.dateScale)
        .tickSize(6, 0)
        .tickFormat(d3.timeFormat("%y/%m/%d"));
      var axis = this.svg.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + this.height/1.4 + ")")
        .call(this.dateAxis);
      axis.selectAll("line").style("stroke", "white");
      axis.selectAll("path").style("stroke", "white");
      axis.selectAll("text").style("stroke", "white");
    } else {
      this.dateScale.range([this.margins.left, this.width]);
      this.dateAxis.scale(this.dateScale);
      this.svg.selectAll("g.xaxis")
        .attr("transform", "translate(0," + this.height/1.4 + ")")
        .call(this.dateAxis);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.init();
    if (changes['events']) {
      this.updateVisuals();
    }
  }

  onResize(event) {
    this.updateWidth();
    this.svg.attr('width', this.element.offsetWidth);
    this.updateVisuals();
  }

}
