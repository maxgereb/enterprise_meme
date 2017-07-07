import React from 'react';
import PropTypes from 'prop-types';
import {Users} from './../api/users';
import {Accounts} from 'meteor/accounts-base';
import {browserHistory} from 'react-router';
import {Memes} from './../api/memes';
import {Meteor} from 'meteor/meteor';
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
	Modal,
  FormControl
} from 'react-bootstrap';
export default class CommentSection extends React.Component {
  _submitComment(event){
	 event.preventDefault();
	 const idOfNewComment  =  new Meteor.Collection.ObjectID().valueOf();
	 console.log(event.target.textAreaComment.value);
	 console.log(this.props.currentMeme._id);
	 console.log(Accounts.userId());
	 var contentOfComment = event.target.textAreaComment.value;
	 var currentUser = Meteor.user().profile.givenName;
	 if(event.target.textAreaComment.value){
	 Memes.update(this.props.currentMeme._id,{
								$push: {
								  comments: {
									ownerOfComment_id:Accounts.userId(),
									commentText: contentOfComment,
									ownerOfComment_name: currentUser,
									_id: idOfNewComment
								  }
								}
		});


	 }
	 event.target.textAreaComment.value='';

  }
  _deleteComment(currentComment){
	  	  console.log("id OF comment");
	  console.log(currentComment._id);
	  Memes.update(this.props.currentMeme._id,
		  { $pull:
				{ 'comments':
						{ _id: currentComment._id }
				}
		  }
		);

  }
  _isCommentMine(currentComment){
	  if(currentComment.ownerOfComment_id==Accounts.userId()){
		  return (

				<button  className="delete_comment_buttton" aria-hidden="true" onClick={this._deleteComment.bind(this,currentComment)}>&times;</button>
		   );
	  }else{
		  return(<div></div>);
	  }

  }

	_hideCommentBox(){
		var x = this.refs.commentBoxRef;
		if (x.style.display === 'none') {
				x.style.display = 'block';
		} else {
				x.style.display = 'none';
		}
	}
  _printComments(){

	return this.props.currentMeme.comments.map((comment) => {
      return (
        <li>
					{this._isCommentMine(comment)} {comment.ownerOfComment_name} said:{comment.commentText}

        </li>
      );
    });
  };
  render() {
    return (
			<div>


        <div className="titleBox">

          <label onClick={this._hideCommentBox.bind(this)}>Comment Box</label>

        </div>
        <div className="detailBox" id="commentBox" ref="commentBoxRef" >
          <div >


            <div>
              <ul className="commentList">
                {this._printComments()}
              </ul>
            </div>
          </div>
          <form onSubmit={(e)=>this._submitComment(e)}>
            <center>
              <FormControl id="textAreaComment" name="textAreaComment" componentClass="textarea" placeholder="Say something :)" />
            </center>
            <button  className="button_success_cyan" 	type="submit">Submit</button>


          </form>
        </div>
		</div>
    );
  }

}
