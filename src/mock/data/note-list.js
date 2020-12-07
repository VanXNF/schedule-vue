export const noteListMock =
  {
    'code': 'OK',
    'message': '获取记事列表成功',
    'data': [
      {
        'note_id': 1,
        'note_title': 'title',
        'todo_id': 1,
        'remarks': 'remarks',
        'tag_id': 1,
        'pin_flag': false,
        'delete_flag': false,
        'modify_time': '2020/11/25 18:02:00',
        'todo_list': [{
          'todo_item_id': 1,
          'todo_item_name': 'name',
          'todo_item_status': true,
          'todo_item_init_time': '2020/11/25 18:02:00',
          'todo_item_modify_time': '2020/11/25 18:02:00'
        },
        {
          'todo_item_id': 2,
          'todo_item_name': 'name2',
          'todo_item_status': true,
          'todo_item_init_time': '2020/11/25 18:02:00',
          'todo_item_modify_time': '2020/11/25 18:02:00'
        }
        ]
      },
      {
        'note_id': 2,
        'note_title': 'title',
        'todo_id': 2,
        'remarks': 'remarks',
        'tag_id': 2,
        'pin_flag': true,
        'delete_flag': false,
        'modify_time': '2020/11/25 18:02:00',
        'todo_list': [{
          'todo_item_id': 3,
          'todo_item_name': 'name2',
          'todo_item_status': true,
          'todo_item_init_time': '2020/11/25 18:02:00',
          'todo_item_modify_time': '2020/11/25 18:02:00'
        },
        {
          'todo_item_id': 4,
          'todo_item_name': 'name',
          'todo_item_status': false,
          'todo_item_init_time': '2020/11/25 18:02:00',
          'todo_item_modify_time': '2020/11/25 18:02:00'
        }
        ]
      },
      {
        'note_id': 3,
        'note_title': 'title',
        'todo_id': 2,
        'remarks': 'remarks',
        'tag_id': 2,
        'pin_flag': true,
        'delete_flag': false,
        'modify_time': '2020/11/25 18:02:00',
        'todo_list': [{
          'todo_item_id': 4,
          'todo_item_name': 'name',
          'todo_item_status': true,
          'todo_item_init_time': '2020/11/25 18:02:00',
          'todo_item_modify_time': '2020/11/25 18:02:00'
        },
        {
          'todo_item_id': 5,
          'todo_item_name': 'name',
          'todo_item_status': true,
          'todo_item_init_time': '2020/11/25 18:02:00',
          'todo_item_modify_time': '2020/11/25 18:02:00'
        }
        ]
      }
    ]
  }

export const todoList = {
  'code': 'OK',
  'message': '获取清单成功',
  'data': {
    'todo_id': 1,
    'init_time': '2020/11/25 18:02:00',
    'todo_list': [
      {
        'todo_item_id': 1,
        'todo_item_name': 'name0',
        'todo_item_status': false,
        'todo_item_init_time': '2020/11/25 18:02:00',
        'todo_item_modify_time': '2020/11/25 18:02:00'
      },
      {
        'todo_item_id': 1,
        'todo_item_name': 'name',
        'todo_item_status': false,
        'todo_item_init_time': '2020/11/25 18:02:00',
        'todo_item_modify_time': '2020/11/25 18:02:00'
      }
    ]
  }
}
