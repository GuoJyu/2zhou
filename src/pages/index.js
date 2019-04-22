define(['mui', (mui) => {
    function init() {
        console.log(0)
        mui.init()
        getData()
        delEvent()
        getForm()
    }

    function getData() {
        mui.ajax('/api/getList', {
            success: function(res) {
                console.log(888)
                if (res.code) {
                    render(res.data)
                }
            }
        });
    }

    function render(data) {
        let list = document.querySelector('#list');
        list.innerHTML = data.map(item => {
            return `
            <ul class="mui-table-view" id="list">
                    <li class="mui-table-view-cell">金额:${item.prize} 事件:${item.name} 备注 :${itam.con} 分类:${itam.lei}</li>
                   
                </ul>
            `
        }).join('')
    }

    function delEvent() {
        mui('#list').on('tap', 'mui-btn-danger', function() {
            var id = this.getAttribute('id')
            mui.confirm('你确定删除?', '删除', function(e) {
                if (e.index == 1) {
                    mui.ajax('/api/delData', {
                        data: {
                            "_id": id
                        },
                        success: function(rs) {
                            if (rs.code == 1) {
                                alert('删除成功');

                            } else {
                                '删除失败'
                            }
                        }
                    })
                }
            })
        })
    }

    function getForm() {
        let name = document.querySelector('.name').value.trim();
        let prize = document.querySelector('.prize').value.trim();
        let con = document.querySelector('.con').value.trim();
        let lei = document.querySelector('.lei').value.trim();
        if (name && prize && con && lei) {
            mui.ajax('/api/addData', {
                type: 'post',
                data: {
                    name: name,
                    prize: prize,
                    con: con,
                    lei: lei
                },
                success: function(rs) {
                    console.log(rs)
                    if (rs.code == 1) {
                        alert('成功')
                    }
                }
            })
        }
    }
}])