let hours=[], minute=[];
for(let i=0;i<24;i++){
  if(i<10){
    i='0'+i;
  }
  hours.push(i);
}
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = '0' + i;
  }
  minute.push(i);
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    timeHide:false,
    hours: hours,
    minute: minute,
    value:[0,0,0,0],
    timeData:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openTap(){
      console.log('触发打开');
      this.setData({ timeHide:true});
      console.log(this.data.timeHide);
    },
    cancelTap(){
      this.setData({ timeHide: false });
    },
    confirmTap(){
      this.cancelTap();
      console.log('保存',this.data.timeData);
      this.triggerEvent('timedata', {timeIndex:this.data.value,timeData:this.data.timeData});
    },
    // mainTa(){
    //   console.log(0);
    // },
    // mainBgTap(){
    //   console.log(1);
    // },
    // mainTap() {
    //   console.log(2);
    // },
    bindChange(e){
      console.log(e);
      let value = e.detail.value;
      let timeData = this.data.timeData;
      timeData[0] = this.data.hours[value[0]];
      timeData[1] = this.data.minute[value[1]];
      timeData[2] = this.data.hours[value[2]];
      timeData[3] = this.data.minute[value[3]];
      this.setData({ 
        value,
        timeData
      });
      console.log('改变后',this.data.timeData);
    }
  },
  ready(){
    console.log('触发了');
  }
})
