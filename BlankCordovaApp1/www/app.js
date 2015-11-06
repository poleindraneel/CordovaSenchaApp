Ext.application({
    name: "BlankCordovaApp101",
    requires: ['Ext.MessageBox'],

    views: ['Main'],
    controllers: ['UserController'],
    profile:['phone','tablet'],
    launch: function () {
        Ext.fly('appLoadingIndicator').destroy();
        
    }
});

/*Ext.define('BlankCordovaApp101.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        view: ['Main']
    },

    isActive: function () {
        return Ext.os.is('Phone');
    },

    launch: function () {
        Ext.create('BlankCordovaApp101.views.phone.Main');
    }
});*/

Ext.define('BlankCordovaApp101.view.Main',{
    extend: 'Ext.Container',
    xtype: 'main',
    fullscreen: true,
    config: {
        id: 'mainView', //this id can be used for getter setter object in controller refs
        items: [
        {
            xtype: 'button',
            ref: 'testBtn', //This id should be used in the controller to add the listener for an event. It could be action, id, or ref. In the refs of the controller you must add objectName: 'button[itemId=idName]'
            text: 'test button',
            height:'20%'
        }]
    }
});

Ext.define('BlankCordovaApp101.view.phone.Main', {
    extend: 'BlankCordovaApp101.view.Main',
    xtype: 'main',
    fullscreen: true,
    config: {
        id: 'phoneMainView',
        items: [
        {
            xtype: 'button',
            text: 'Button created inside a phone view',
            ref: 'tstPhnBtn'
        }]
    }
});
Ext.define('BlankCordovaApp101.view.tablet.Main', {
extend: 'BlankCordovaApp101.view.Main',
xtype: 'main',
fullscreen: true,
config: {
    id: 'tabMainView',
    items: [
    {
        xtype: 'button',
        text: 'Button created inside a tablet view',
        ref: 'tstTbltBtn'
    }]
}
});

Ext.define('BlankCordovaApp101.controller.UserController', {
    extend: 'Ext.app.Controller',
    views: ['BlankCordovaApp101.view.Main'],
    config: {
        refs: {
            mainView: '#mainView', //Needs hash in front of it
            tstBtn: 'button[ref=testBtn]'
        },
        control: {
            tstBtn: {
                tap: 'onBtnClick'
            }
        }
    },
    onBtnClick: function () {
        console.log("inside on click function");
        var me = this;
        var nav = me.getMainView();
        Ext.Msg.alert("Warning!", "You clicked test button");
    },
});
Ext.define('BlankCordovaApp101.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        views: ['phoneview']
    },

    isActive: function () {
        console.log(Ext.os.is('Phone'));
        return Ext.os.is('Phone');
    },
    launch: function () {
        Ext.Viewport.add(Ext.create('BlankCordovaApp101.view.phone.Main', { fullscreen: true }));
    }
});

Ext.define('BlankCordovaApp101.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet',
        views: ['tabview']
    },

    isActive: function () {
        return Ext.os.is('Tablet');
    }
});
