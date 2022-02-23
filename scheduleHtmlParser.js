function getSections(str, History) {
    if (!str) {
        return History
    }
    let start = parseInt(str.split('-')[0])
    let end = parseInt(str.split('-')[1])
    let sections = []
    let sectionTimes = [
    {
    section:1+ 0,
    startTime: "08:10",
    endTime: "08:55"
}, {
    section:1+ 1,
    startTime: "09:00",
    endTime: "09:45"
}, {
    section:1+ 2,
    startTime: "10:15",
    endTime: "11:00"
}, {
    section:1+ 3,
    startTime: "11:05",
    endTime: "11:50"
}, {
    section:1+ 4,
    startTime: "14:30",
    endTime: "15:15"
}, {
    section:1+ 5,
    startTime: "15:20",
    endTime: "16:05"
}, {
    section:1+ 6,
    startTime: "16:30",
    endTime: "17:15"
}, {
    section:1+ 7,
    startTime: "17:20",
    endTime: "18:05"
}, {
    section:1+ 8,
    startTime: "19:30",
    endTime: "20:15"
}, {
    section:1+ 9,
    startTime: "20:25",
    endTime: "21:10"
}]
    for (let i = start; i <= end; i++) {
        sections.push({

            ...sectionTimes[i-1]

        })
    }
    return sections
}

function getWeeks(week) {
    // 将全角逗号替换为半角逗号
    let reg = new RegExp("，", "g");
    week.replace(reg, ',');
    let weeks = [];

    // 以逗号为界分割字符串，遍历分割的字符串
    week.split(",").forEach(w => {
        if (w.search('-') != -1) { //如果是X-Y类型
            let range = w.split("-");
            let start = parseInt(range[0]);
            let end = parseInt(range[1]);
            let temp = [];
            let flag = 0
            if (w.search('单') != -1) {
                flag = 1
                week = week.replace('(单)', '')
            } else if (w.search('双') != -1) {
                flag = 2
                week = week.replace('(双)', '')
            }
            for (let i = start; i <= end; i++) {
                if (!weeks.includes(i)) {
                    temp.push(i);
                }
            }

            temp = temp.filter((v) => { //单双周筛选
                if (flag == 1) {
                    return v % 2 == 1
                } else if (flag == 2) {
                    return v % 2 == 0
                }
                return v
            })


            weeks = weeks.concat(temp);
        } else if (w.length != 0) {
            let v = parseInt(w);
            if (!weeks.includes(v)) {
                weeks.push(v);
            }
        }

    });
    return weeks;
}

// 解析列表模式
function parseList(html) {
    let result = []
    let History;
    const $ = cheerio.load(html, {
        decodeEntities: false
    });
    $('#kblist_table').find('tbody').each(function (weekday) { //一周七天循环
        if (weekday > 0) {
            $(this).find('tr').each(function (index) { //一天课程数量循环
                if (index > 0) {
                    let course = {}
                    //----------------------------//
                    course.sections = getSections($(this).find('td')[0].children[0].children[0].data,History) //上课节次
                    History = course.sections;
                    $(this).find('.timetable_con.text-left').each(function (e) {
                        course.name = $(this).find('.title').text() //上课内容
                        let info = []
                        $(this).find('p font').each(function () {
                            let text = $(this).text().trim()
                            if (text.search('上课地点') != -1) {
                                text = text.replace('上课地点：', '')
                            }
                            info.push(text.split('：')[1])
                        })
                        let reg = new RegExp('周', 'g')
                        let weekStr = info[0].replace(reg, '')
                        // console.log(weekStr);
                        course.weeks = getWeeks(weekStr) //上课周次
                        course.teacher = info[2] //上课老师
                        course.position = info[1] //上课地址
                        course.day = weekday //上课周几

                    })
                    result.push(course)
                }
            })
        }
    })
    console.log(result)
    return result
}



function scheduleHtmlParser(html) {
    let result = []
    result = parseList(html)

    console.log(result.length)
//     return {
//         "courseInfos": result,
//         "sectionTimes": sectionTimes
//     }
return result
}
