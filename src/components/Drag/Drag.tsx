import React, { PureComponent ,MouseEvent, TouchEvent } from 'react';
import { Style, GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';

export interface DragProps extends GeneralProps {
  onDragStart?: (e: MouseEvent|TouchEvent) => void;
  onDragMoving?: (e: MouseEvent|TouchEvent) => void;
  onDragEnd?: (e: MouseEvent|TouchEvent) => void;
};

export interface DragStates {};


const defaultProps = {};

type DefaultProps = Readonly<typeof defaultProps>;

const getProps = createPropsGetter(defaultProps);

class Drag extends PureComponent<DragProps & DefaultProps, DragStates> {
  static defaultProps = defaultProps;
  private canMove: boolean;
  private canTouch: boolean;
  private oldX: number;
  private oldY: number;
  private newX: number;
  private newY: number;
  private offsetTop: number;
  private offsetLeft: number;
  private newTop: number;
  private newLeft: number;
  private boxHeight: number;
  private boxWidth: number;

  constructor(props: DragProps){
    super(props);
    this.canMove=false;
    this.canTouch=false;
    this.oldX=0;
    this.oldY=0;
    this.newX=0;
    this.newY=0;
    this.offsetTop=0;
    this.offsetLeft=0;
    this.newTop=0;
    this.newLeft=0;
    this.boxHeight=0;
    this.boxWidth=0;
  }
  handleMouseDown(e: MouseEvent){
    this.newX=e.clientX;
    this.newY=e.clientY;
  }
  handleMouseMove(e: MouseEvent){
    if(this.canMove){
      this.oldX=this.newX;
      this.oldY=this.newY;

      this.newX=e.clientX;
      this.newY=e.clientY;

      this.offsetTop=(this.refs.dragger as any).offsetTop;
      this.offsetLeft=(this.refs.dragger as any).offsetLeft;

      this.newTop=this.offsetTop+this.newY-this.oldY;
      this.newLeft=this.offsetLeft+this.newX-this.oldX;

      //处理边界问题
      if(this.newTop >= 0 && 
         this.newLeft >= 0 &&
         this.newTop <= document.documentElement.clientHeight - this.boxHeight &&
         this.newLeft <= document.documentElement.clientWidth - this.boxWidth
      ){
        (this.refs.dragger as HTMLElement).style.top = this.newTop + 'px';
        (this.refs.dragger as HTMLElement).style.left = this.newLeft + 'px';
      }
    }
  }
  handleMouseUp(e: MouseEvent){
    this.canMove=false;
  }
  handleTouchStart(e: TouchEvent){
    this.newX=e.touches[0].clientX;
    this.newY=e.touches[0].clientY;
  }
  handleTouchMove(e: TouchEvent){
    if(this.canTouch){
      this.oldX=this.newX;
      this.oldY=this.newY;

      this.newX=e.touches[0].clientX;
      this.newY=e.touches[0].clientY;

      this.offsetTop=(this.refs.dragger as any).offsetTop;
      this.offsetLeft=(this.refs.dragger as any).offsetLeft;

      this.newTop=this.offsetTop+this.newY-this.oldY;
      this.newLeft=this.offsetLeft+this.newX-this.oldX;

      //处理边界问题
      if(this.newTop >= 0 && 
         this.newLeft >= 0 &&
         this.newTop <= document.documentElement.clientHeight - this.boxHeight &&
         this.newLeft <= document.documentElement.clientWidth - this.boxWidth
      ){
        (this.refs.dragger as HTMLElement).style.top = this.newTop + 'px';
        (this.refs.dragger as HTMLElement).style.left = this.newLeft + 'px';
      }
    }
  }
  handleTouchEnd(e: TouchEvent){
    this.canTouch=false;
  }

  onMouseDown(e: MouseEvent){
    this.canMove=true;
    this.props.onDragStart && this.props.onDragStart(e);
  }
  onTouchStart(e: TouchEvent){
    this.canTouch=true;
    this.props.onDragStart && this.props.onDragStart(e);
  }
  componentDidMount(){
    this.boxHeight=(this.refs.dragger as HTMLElement).offsetHeight;
    this.boxWidth=(this.refs.dragger as HTMLElement).offsetWidth;

    document.documentElement.addEventListener('mousedown',(this.handleMouseDown as any).bind(this));
    document.documentElement.addEventListener('mousemove',(this.handleMouseMove as any).bind(this));
    document.documentElement.addEventListener('mouseup',(this.handleMouseUp as any).bind(this));

    document.documentElement.addEventListener('touchstart',(this.handleTouchStart as any).bind(this));
    document.documentElement.addEventListener('touchmove',(this.handleTouchMove as any).bind(this));
    document.documentElement.addEventListener('touchend',(this.handleTouchEnd as any).bind(this));
  }
  componentWillUnmount(){
    document.documentElement.removeEventListener('mousedown',(this.handleMouseDown as any).bind(this));
    document.documentElement.removeEventListener('mousemove',(this.handleMouseMove as any).bind(this));
    document.documentElement.removeEventListener('mouseup',(this.handleMouseUp as any).bind(this));

    document.documentElement.removeEventListener('touchstart',(this.handleMouseDown as any).bind(this));
    document.documentElement.removeEventListener('touchmove',(this.handleMouseMove as any).bind(this));
    document.documentElement.removeEventListener('touchend',(this.handleMouseUp as any).bind(this));
  }
  public render() {
    const { children } = getProps(this.props);
    return (
      <div
        className="drag-container"
        ref="dragger"
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseMove={(e: MouseEvent)=>{
          this.props.onDragMoving && this.props.onDragMoving(e);
        }}
        onMouseUp={(e: MouseEvent)=>{
          this.props.onDragEnd && this.props.onDragEnd(e);
        }}
        onTouchStart={this.onTouchStart.bind(this)}
        onTouchMove={(e: TouchEvent)=>{
          this.props.onDragMoving && this.props.onDragMoving(e);
        }}
        onTouchEnd={(e: TouchEvent)=>{
          this.props.onDragEnd && this.props.onDragEnd(e);
        }}
      >
        {children}
        <style>{`
        .drag-container{
          position:fixed;
          cursor:move;
          -webkit-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          user-select:none;
        }
      `}</style>
      </div>
    );
  };
};

export default Drag;
