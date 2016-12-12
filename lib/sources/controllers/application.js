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

goog.provide( 'todomvc.controllers.Application' );

goog.require( 'zz.app.controllers.FEBaseApplication' );
goog.require( 'zz.controllers.enums.EventType' );
goog.require( 'todomvc.views.Application' );
goog.require( 'todomvc.enums.Const' );

/**
 * Application controller.
 * @param {todomvc.models.Application} model
 * @param {todomvc.views.Application} view
 * @param opt_dom
 * @constructor
 * @extends {zz.app.controllers.FEBaseApplication}
 */
todomvc.controllers.Application = function( model, view, opt_dom ){

    goog.base( this, model, view, opt_dom );
};
goog.inherits(

    todomvc.controllers.Application,
    zz.app.controllers.FEBaseApplication );

/**
 *  @override
 */
todomvc.controllers.Application.prototype.setupListenersInternal = function( ){

    this.getHandler( ).listenWithScope(

        this,
        zz.controllers.enums.EventType.ACTION,
        this.actionHandler_,
        false,
        this
    );
};

/**
 *  @override
 */
todomvc.controllers.Application.prototype.setupModelInternal = function( ){

    this.getModel( ).createLast( [

        '',
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        true
    ] );
};


/**
 * Action event handler.
 * @param {zz.controllers.events.Action} e
 * @private
 */
todomvc.controllers.Application.prototype.actionHandler_ = function( e ){

    var modelView = this.getModel( ).lastDatarow( ).itemView;

    if( this.getView( ).isActionCompleteAll( e ) ){

        var completed, active;

        if( modelView.firstDatarow( ) ){

            do{
                if( modelView.currentDatarow( ).completed ){

                    completed = true;
                }else{

                    active = true;
                }

            }while( modelView.nextDatarow( ) )
        }
        if( modelView.firstDatarow( ) ){

            if( active ){

                do{

                    if( !modelView.currentDatarow( ).completed ){

                        modelView.currentDatarow( ).completed = true;
                    }

                }while( modelView.nextDatarow( ) )

            }else{

                do{

                    if( modelView.currentDatarow( ).completed ){

                        modelView.currentDatarow( ).completed = false;
                    }

                }while( modelView.nextDatarow( ) )
            }
        }
    }else if( this.getView( ).isActionRemoveCompleted( e ) ){

        if( modelView.firstDatarow( ) ){

            do{

                if( modelView.currentDatarow( ).completed ){

                    modelView.deleteCurrent( );
                }

            }while( modelView.nextDatarow( ) )
        }
    }
};
/**
 *  Synchronize item storage model.
 */
todomvc.controllers.Application.prototype.syncItemStorageModel_ = function( ){

    var completed, active;
    var modelView = this.getModel( ).lastDatarow( ).itemView;
    var modelStorage = this.getModel( ).lastDatarow( ).itemStorage;
    if( modelView.firstDatarow( ) ){

       do{
            if( modelView.currentDatarow( ).completed ){

                completed = true;
            }else{

                active = true;
            }
            
        }while( modelView.nextDatarow( ) )
    }
    
    if( completed && active ){
        
        while( modelStorage.deleteLast( ) ){}
        
        if( modelView.firstDatarow( ) ){

            do{

                modelStorage.createLast( [

                    modelView.currentDatarow( ).text,
                    modelView.currentDatarow( ).completed
                ] );

            }while( modelView.nextDatarow( ) )
        }
    }else if( completed && !active ){

        if( modelStorage.firstDatarow( ) ){

            do{
                if( modelStorage.currentDatarow( ).completed ){

                    modelStorage.deleteCurrent( );
                }

            }while( modelView.nextDatarow( ) )
        }

        if( modelView.firstDatarow( ) ){

            do{

                modelStorage.createLast( [

                    modelView.currentDatarow( ).text,
                    modelView.currentDatarow( ).completed
                ] );

            }while( modelView.nextDatarow( ) )
        }
    }else if( !completed && active ){

        if( modelStorage.firstDatarow( ) ){

            do{
                if( modelStorage.currentDatarow( ).active ){

                    modelStorage.deleteCurrent( );
                }

            }while( modelView.nextDatarow( ) )
        }

        if( modelView.firstDatarow( ) ){

            do{

                modelStorage.createLast( [

                    modelView.currentDatarow( ).text,
                    modelView.currentDatarow( ).completed
                ] );

            }while( modelView.nextDatarow( ) )
        }
    }
};
/**
 *  Count active items number and write it to the model.
 */
todomvc.controllers.Application.prototype.activeItemsCount_ = function( ){

    var itemModelStorage = this.getModel( ).lastDatarow( ).itemStorage;

    if( itemModelStorage.firstDatarow( ) ){

        var i = 0;
        do{
            if( !itemModelStorage.currentDatarow( ).completed ){

                i++;
            }
        }while( itemModelStorage.nextDatarow( ) )
    }
    this.getModel( ).lastDatarow().activeItemsNumber = i;

    if( i < 2 ){

        this.getModel( ).lastDatarow().activeItemsPlural = todomvc.enums.Const.ITEM;
    }else{

        this.getModel( ).lastDatarow().activeItemsPlural = todomvc.enums.Const.ITEMS;
    }
};