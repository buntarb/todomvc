/**
* @fileoverview Provide todomvc base object.
* @license Apache-2.0
* @author popkov.aleksander@gmail.com (Popkov Alexander)
*/

goog.provide( 'todomvc' );

goog.require( 'todomvc.controllers.Application' );
goog.require( 'todomvc.views.Application' );
goog.require( 'todomvc.models.Application' );
goog.require( 'todomvc.controllers.Item' );
goog.require( 'todomvc.views.Item' );

/**
* Base namespace for todomvc module.
* @const
*/
todomvc = todomvc || { };

/**
* Bootstrap module method.
*/
todomvc.bootstrap = function( ){

    /**
     * Application model.
     * @type {todomvc.models.Application}
     */
    var appModel = new todomvc.models.Application( );

    /**
     * Application view.
     * @type {todomvc.views.Application}
     */
    var appView = new todomvc.views.Application( );

    window[ 'controller' ] = new todomvc.controllers.Application( appModel, appView );

    //todomvc.config( );
};
goog.exportSymbol( 'todomvc.bootstrap', todomvc.bootstrap );