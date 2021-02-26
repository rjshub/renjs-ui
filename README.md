# renjs-ui

> renjs-ui product

## Build Setup

```bash
# install dependencies
npm install renjs-ui --save

# HourWeek组件
时间选择器，按照周和时将时间划分，最小粒度为半小时。按周划分为七行，按日划分为48列。

组件参数：
        config
        非必传，用于编辑时的状态回填，需要timeContent、timeSection、timeStr，（将组件产生的数据返回即可）
组件事件：
        save
            确定时间选择后触发的事件，返回timeContent、timeSection、timeStr。
            timeContent：每行选中时间的index（0-47），可用于后端计算。
            timeSection：每行选中时间段的起止时间（多维数组，半小时为.5）
            timeStr：每行选中事件的字符串展示（05:30~09:30），用于前端展示。
        clear
            将选中的时间全部清零。

# FilterSelect 组件
element-ui select下拉筛选框重写，合并已选项。支持搜索和下拉加载，避免数据量过大造成页面崩溃。可用于数据结构复杂的筛选。

组件参数：
        options
            必传，下拉框的下拉选项。
        checked
            非必传，已选中的项。
        prop
            非必传，用于配置下拉选项的label和value，默认赋值label和value，options中的每一项必须包含prop中的属性。
            （label_id）附加属性，用于处理label存在同名时的展示。
            {
                value: 'option_id', 
                label: `option_name`, 
                label_id: 'option_id'
            }
        loadMore
            非必传，默认false。是否需要滚动加载更多选项。
        showId
            非必传，默认false。是否需要对下拉选项的label拼接唯一id，和prop中的label_id同时使用。
        multiple
            非必传，默认false。是否为多选。
        clearable
            非必传，默认false。是否可清除。
        filterable
            非必传，默认false。是否可搜索。
        width
            非必传，默认200px。筛选框组件的宽度。
        
        placeholder
            非必传，默认 please select。筛选框组件的文本占位。
        limit
            非必传，默认0。多选时用户最多可以选择的项目数，为 0 则不限制
组件事件：
        change
            改变筛选项是触发，返回选中结果。