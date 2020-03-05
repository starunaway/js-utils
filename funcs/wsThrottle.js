// import Action from '@actions';
// import cloneDeep from 'lodash/cloneDeep';

class Throttle {
  constructor(type) {
    this._MSGTYPE = type;
    this._queue = []; // 缓存socket推送过来的数据
    this._timer = null;
    this._renderQueueLength = 0;
    this._checkFlag = false;
  }

  //    TODO:只有当前页面处于活动状态才进行操作
  //  入队
  // 入队后检查定时器，存在则只入队，不存在则启动计时
  push = item => {
    item = this._beforePush(item);
    this._keepnew(item);
    this._render();
  };

  //  对数据进行标准化
  _beforePush = item => {
    if (!item.id) {
      const { isinCode, brokerId } = item;
      if (this._MSGTYPE === 'quote') {
        // isinCode+brokerId表示唯一
        item['id'] = `${isinCode}_${brokerId}`;
      } else if (this._MSGTYPE === 'bond') {
        // isinCode表示唯一
        item['id'] = `${isinCode}`;
      }
    }
    item.origin = 'socket';
    return item;
  };

  //   如果收到重复推送过来的数据，保持最新
  _keepnew = item => {
    let findIndex = this._queue.findIndex(_item => _item.id === item.id);
    if (findIndex > -1) {
      if (this._MSGTYPE === 'quote') {
        if (this._queuefindIndex.quoteTime < item.quoteTime) {
          // quote 需要比较时间
          this._queue.splice(findIndex, 1, item);
        } else {
          // 队列里的数据是最新的 ，socket数据丢弃
        }
      } else if (this._MSGTYPE === 'bond') {
        //   bond 直接替换
        this._queue.splice(findIndex, 1, item);
      }
    } else {
      this._renderQueueLength++;
      this._queue.push(item);
    }
  };

  //   每隔一定时间，使用队列中的数据进行渲染
  //   渲染后 origin字段需要置空
  _render = () => {
    if (!this._timer) {
      console.log('启动任务');
      this._timer = setTimeout(() => {
        this._task();
        clearTimeout(this.timer);
        this._timer = null;
      }, 1000);
    }
  };

  _task() {
    let items = [];
    this._queue.forEach((item, index) => {
      if (index >= this._queue.length - this._renderQueueLength) {
        items.push(cloneDeep(item));
      }
      delete item.origin;
    });

    // Action.emit('ofb.${this._MSGTYPE}.changeList', items);
    this._renderQueueLength = 0;
  }

  //   主动调用，检查队列中的数据是否比当前页面上新
  //  ：收到refresh信号后，请求到的数据可能比缓存的数据旧
  //   收到refresh信号后更新的数据，将从队列中弹出
  check() {
    this._checkFlag = true;
    // Action.emit(`ofb.${this._MSGTYPE}.changeList`, this._queue);

    this._queue = [];
    this._checkFlag = false;
    console.log('检查队列');
  }
}

export default new Throttle('bond');
