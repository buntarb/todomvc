// Copyright 2016 Artem Lytvynov <buntarb@gmail.com>. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @license Apache-2.0
 * @copyright Artem Lytvynov <buntarb@gmail.com>
 */

goog.provide( 'todomvc.controllers.Item' );

goog.require( 'zz.controllers.FEBase' );
goog.require( 'zz.controllers.enums.EventType' );
goog.require( 'zz.models.enums.EventType' );

goog.require( 'zz.environment.services.Environment' );

/**
 * Application controller.
 * @param {todomvc.models.Item} model
 * @param {todomvc.views.Item} view
 * @param opt_dom
 * @constructor
 * @extends {zz.controllers.FEBase}
 */
todomvc.controllers.Item = function( model, view, opt_dom ){

    goog.base( this, model, view, opt_dom );

    this.rootController_ = zz.environment.services.Environment

        .getInstance( )
        .getRootController( );
};
goog.inherits(

    todomvc.controllers.Item,
    zz.controllers.FEBase );

zz.environment.services.MVCTree
    .registry
    .setController( 'item', todomvc.controllers.Item );

/**
 *  @override
 */
todomvc.controllers.Item.prototype.setupListenersInternal = function( ){

    this.getHandler( ).listenWithScope(

        this,
        zz.controllers.enums.EventType.ACTION,
        this.actionHandler_,
        false,
        this
    );

    this.getHandler( ).listen(

        this.getModel( ),
        zz.models.enums.EventType.DATAROW_UPDATE,
        this.modelChangeHandler_,
        false
    );

    this.getHandler( ).listen(

        this.getModel( ),
        zz.models.enums.EventType.DATAROW_CREATE,
        this.modelChangeHandler_,
        false
    );

    this.getHandler( ).listen(

        this.getModel( ),
        zz.models.enums.EventType.DATAROW_DELETE,
        this.modelChangeHandler_,
        false
    );
};

/**
 *  @override
 */
todomvc.controllers.Item.prototype.setupModelInternal = function( ){

    this.getModel( ).createLast( [

        'test1',
        false
    ] );

    this.getModel( ).createLast( [

        'test2',
        true
    ] );

    this.getModel( ).createLast( [

        'test3',
        false
    ] );

    this.getModel( ).createLast( [

        'test4',
        false
    ] );
};

/**
 * Action event handler.
 * @param {zz.controllers.events.Action} e
 * @private
 */
todomvc.controllers.Item.prototype.actionHandler_ = function( e ){

    var model = this.getModel( );
    var uid = e.model.getUid( );
    var loop = true;

    if( this.getView( ).isActionCompleteItem( e ) ){

        if( model.firstDatarow( ) ){

            while( loop ){

                if( model.currentDatarow( ).getUid( ) === uid ){

                    loop = false;
                    model.currentDatarow( ).completed = !model.currentDatarow( ).completed;

                }else{

                    model.nextDatarow( );
                }
            }
        }
    }else if( this.getView( ).isActionRemoveItem( e ) ){

        if( model.firstDatarow( ) ){

            while( loop ){

                if( model.currentDatarow( ).getUid(  ) === uid ){

                    loop = false;
                    model.deleteCurrent( );

                }else{

                    model.nextDatarow( );
                }
            }
        }
    }
    e.stopPropagation( );
};

/**
 * Search input change event handler.
 * @param {zz.models.events.DatarowUpdate|zz.models.events.DatarowCreare|zz.models.events.DatarowDelete} e
 * @private
 */
todomvc.controllers.Item.prototype.modelChangeHandler_ = function( e ){

    this.rootController_.syncItemStorageModel_( );
    this.rootController_.activeItemsCount_( );

    e.stopPropagation( );
};
