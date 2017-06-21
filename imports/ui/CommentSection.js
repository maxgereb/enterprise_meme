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
	 var currentUser = Accounts.userId();
	 if(event.target.textAreaComment.value){
	 Memes.update(this.props.currentMeme._id,{
								$push: {
								  comments: {
									commentText: contentOfComment,
									ownerOfComment: currentUser,
									_id: idOfNewComment
								  }
								}
		});
	
		
		
	 }
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
	  if(currentComment.ownerOfComment==Accounts.userId()){
		  return (<div>
				<button onClick={this._deleteComment.bind(this,currentComment)}>Delete</button>
		  </div>);
	  }else{
		  return(<div>Ne e tvoi we</div>);
	  }
	  
  }
  _printComments(){
	  
	/*  var asd ="COMM";
	  return(
			<div>
				{asd}
			</div>
	);
	*/
	
	return this.props.currentMeme.comments.map((comment) => {
      return (
        <div>
			Text: {comment.commentText} User: {comment.ownerOfComment}  {this._isCommentMine(comment)}
        </div>
      );
    });
  };
  render() {
    return (
		<div>
		

		
		<div>
			<div >
			<label>Comment Box</label>
			
			</div>
			{this._printComments()}
		</div>
		<form onSubmit={(e)=>this._submitComment(e)}>
			<center>
			<FormControl style={{width:500}}name="textAreaComment" componentClass="textarea" placeholder="Say something :)" />
			</center>
            <Button  type="submit">Submt</Button>

          
        </form>
      </div>
    );
  }

}
