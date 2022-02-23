/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer() {
    // 内嵌loadTool工具，传入工具名即可引用公共工具函数(暂未确定公共函数，后续会开放)
    await loadTool('AIScheduleTools')
    const {
        AIScheduleAlert
    } = AIScheduleTools()


    // 模拟Prompt，参数是个对象，具体内容看注释，返回值是String
    const totalWeek = await AISchedulePrompt({
        titleText: '总周数', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
        tipText: '默认20周，特殊情况请查看校历', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，也可以不传就不显示
        defaultText: '20', // 文字输入框的默认内容，不传会显示版本号，所以空内容要传个''
        validator: value => { // 校验函数，如果结果不符预期就返回字符串，会显示在屏幕上，符合就返回false
            console.log(value)
            let n = Number(value);
            if (!isNaN(n) && n > 0) {
                return false
            }
            return '请输入大于0的整数'
        }
    })

    // 确认模块，用于让用户选择是或者否，返回值为Boolean
    const showWeekend = await AIScheduleConfirm({
        titleText: '周末有课？', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
        contentText: '显示周末课程，无课则不显示', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
        cancelText: '无', // 取消按钮文字，可不传默认为取消
        confirmText: '有', // 确认按钮文字，可不传默认为确认
    })

    // 模拟Prompt，参数是个对象，具体内容看注释，返回值是String
    const startSemester = await AISchedulePrompt({
        titleText: '第一周的星期一是？', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
        tipText: '请查看校历，填写格式为【xxxx-xx-xx]', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，也可以不传就不显示
        defaultText: '2022-02-25', // 文字输入框的默认内容，不传会显示版本号，所以空内容要传个''
        validator: value => { // 校验函数，如果结果不符预期就返回字符串，会显示在屏幕上，符合就返回false
            console.log(value)
            let n = new Date(value).getTime()
            if (!isNaN(n) && n > 0) {
                return false
            }
            return '格式错误'
        }
    })

    await AIScheduleAlert(`本学期共${totalWeek}周，${showWeekend ? '有' : '无'}周末课，第一周的星期一是${startSemester}`)

    await AIScheduleAlert('导入完成后请检查课表配置是否正确，如有问题请从企业微信找我')

    // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
    return {
        totalWeek: Number(totalWeek), // 总周数：[1, 30]之间的整数
        startSemester: String(new Date(startSemester).getTime()), // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 2, // 晚间课程节数：[0, 10]之间的整数
        sections: [{
            section: 1 + 0,
            startTime: "08:10",
            endTime: "08:55"
        }, {
            section: 1 + 1,
            startTime: "09:00",
            endTime: "09:45"
        }, {
            section: 1 + 2,
            startTime: "10:15",
            endTime: "11:00"
        }, {
            section: 1 + 3,
            startTime: "11:05",
            endTime: "11:50"
        }, {
            section: 1 + 4,
            startTime: "14:30",
            endTime: "15:15"
        }, {
            section: 1 + 5,
            startTime: "15:20",
            endTime: "16:05"
        }, {
            section: 1 + 6,
            startTime: "16:30",
            endTime: "17:15"
        }, {
            section: 1 + 7,
            startTime: "17:20",
            endTime: "18:05"
        }, {
            section: 1 + 8,
            startTime: "19:30",
            endTime: "20:15"
        }, {
            section: 1 + 9,
            startTime: "20:25",
            endTime: "21:10"
        }], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
    }
}
