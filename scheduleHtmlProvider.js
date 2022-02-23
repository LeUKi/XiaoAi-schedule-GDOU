async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
      // 此步为必须，用于加载这个工具，后续会增加更多方法
  await loadTool('AIScheduleTools')
  const { AIScheduleAlert } = AIScheduleTools()
  // 使用它们的时候务必带上await，否则没有系统alert的时停效果
  await AIScheduleAlert('连跨四个时间段的大课可能会只识别成两个，请务必检查！')

  // 使用时务必带上await，否则没有系统alert的时停效果
  if(document.getElementById('kblist_table')){
    return dom.querySelector('#kblist_table').outerHTML 
  }
  await AIScheduleAlert('非课表页，导入停止')
  return "do not continue"
} 
