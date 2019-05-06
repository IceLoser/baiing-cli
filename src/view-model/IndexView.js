import api from '@/model/api';
import message from '@/tools/message';
import loading from '@/tools/loading';

const INDEXVIEW = {
    data() {
        return {
            dataList: []
        }
    },
    init() {
        this.onEvent();
        this.created.init();
    },
    created: { // 页面数据获取
        login() {
            let param = {
                username: '',
                password: '',
                lastUsedLocationId: $.cookie('locationId') || '',
                configToken: 'CA4DADB7DE7656EDB8C7A3A2036836317CE8AAE0C2397CD36D1E3EAAE3774EA2313315F14FBD7163A28D28055F5FD5F3D80B1BFC30CEDD45E6D4E869B4E3875329B86EF0EB01E10DBE05D314ED7D59D846F77CCBE7B96A99EE8E1C599A0D107F1E183AA286878FB454CAEB6F85F2E70F'
            };
            loading.start();
            api.login(param).then(res => {
                if (res.success && res.code === '0') {
                    let timer = setTimeout(() => {
                        loading.stop();
                        message('success', { title: '成功!', message: '登录成功!' });
                    }, 2000);
                }
            }).catch(err => console.info(err));
        },
        init() { this.login() }
    },
    onEvent() { // 页面事件处理
        $(document).on('click', '#btn', function(e) {
            if ($(this).find('span').text() === '开始加载') {
                loading.start('.animation-box');
                loading.start('.animation-button');

                $(this).removeClass('button-info');
                $(this).addClass('button-warning');

                $(this).find('span').text('结束加载');
            } else {
                loading.stop('.animation-box');
                loading.stop('.animation-button');

                $(this).removeClass('button-warning');
                $(this).addClass('button-info');

                $(this).find('span').text('开始加载')
            }
        });
    },
};

export default INDEXVIEW;