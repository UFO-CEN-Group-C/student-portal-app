import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Input } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';

class CreateProfile extends Component{
    constructor(props){
        super(props);
        const inherit = this.props.inherit;
        if (inherit === 'no'){
            this.state = {
                UserID: '',
                Password: '',
                First: '',
                Last: '',
                Address: '',
                City:'',
                State:'',
                Zipcode:'',
                Phone:'',
                Email:'',
                Github:'',
                Bio:'',
                Team: '',
                Skills: [{name: ''}],
                Projects: [{name: ''}],
                ProfilePicURL: '',
                Options: 'POST',
                Target: 'api/users',
                FilesToUpload: []
            }
        } else if(inherit === 'yes') {
            const data = this.props.location.state.data;
            this.state = {
                UserID: data.UserID,
                Password: data.Password,
                First: data.First,
                Last: data.Last,
                Address: data.Address,
                City: data.City,
                State: data.State,
                Zipcode: data.Zipcode,
                Phone: data.Phone,
                Email: data.Email,
                Github: data.Github,
                Bio: data.Bio,
                Team: data.Team,
                Skills: data.Skills,
                Projects: data.Projects,
                ProfilePicURL: data.ProfilePicURL,
                Options: 'PUT',
                Target: 'api/users/' + data.UserID,
                FilesToUpload: []
            }
        }
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleSkillChange = (index) => (e) => {
        const newSkills = this.state.Skills.map((skill, skillIndex) => {
            if (index !== skillIndex) return skill;
            return { ...skill, name: e.target.value};
        });
        this.setState({Skills: newSkills})
    }

    handleProjectChange = (index) => (e) => {
        const newProjects = this.state.Projects.map((project, projectIndex) => {
            if (index !== projectIndex) return project;
            return { ...project, name: e.target.value};
        });
        this.setState({Projects: newProjects})
    }

    addProject = (e) => {
        e.preventDefault();
        this.setState({
            Projects: this.state.Projects.concat([{name: ''}])
        })
    }

    addSkill = (e) => {
        e.preventDefault();
        this.setState({
            Skills: this.state.Skills.concat([{name: ''}])
        })
    }

    deleteProject = (index) => (e) => {
        e.preventDefault();
        this.setState({
            Projects: this.state.Projects.filter((project, projectIndex) => index !== projectIndex)
        })
    }


    deleteSkill = (index) => (e) => {
        e.preventDefault();
        this.setState({
            Skills: this.state.Skills.filter((skill, skillIndex) => index !== skillIndex)
        })
    }

    onDrop = (fileInput) => {
        var file = document.getElementById("fileUpload");
        var name = file.files[0].name;
        console.log(name);
        fetch('api/upload',{
            method: 'POST',
            body: fileInput
        })
        this.setState({
            ProfilePicURL: "http://s3.amazonaws.com/cen-3031-student-portal-app/" + name
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var User = this.state;
        fetch(this.state.Target, {
            method: this.state.Options,
            body: JSON.stringify(User),
            headers: {"content-type": "application/json"}
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
        
        this.setState({
            UserID: '',
            Password: '',
            First: '',
            Last: '',
            Address: '',
            City:'',
            State:'',
            Zipcode:'',
            Phone:'',
            Email:'',
            Github:'',
            Bio:'',
            Skills: [{name: ''}],
            Team: ''
        });
    }

    render() {     
        return(
            <div className="column1">
                <AppBar position="static" >
                    <Typography variant="title" color="inherit">
                    Enter user details
                    </Typography>
                </AppBar>
                <Grid container direction="column" spacing={16} >
                    <Grid item md={12}>
                        <label className="display-label">UserID</label>
                        <Input 
                            className="text-input" 
                            name="UserID" 
                            title="UserID"
                            value={this.state.UserID} 
                            onChange={this.handleChange}
                            placeholder="Enter your new UserID"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">Password</label>
                        <Input 
                            className="text-input" 
                            name="Password" 
                            title="Password"
                            value={this.state.Password} 
                            onChange={this.handleChange}
                            placeholder="Enter your new Password"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={8}>
                        <label className="display-label">First Name</label>
                        <Input 
                            className="text-input" 
                            name="First" 
                            title="First"
                            value={this.state.First} 
                            onChange={this.handleChange}
                            placeholder="Enter your first name"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={8}>
                        <label className="display-label">Last Name</label>
                        <Input 
                            className="text-input" 
                            name="Last" 
                            title="Last"
                            value={this.state.Last} 
                            onChange={this.handleChange}
                            placeholder="Enter your last name"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">Address</label>
                        <Input 
                            className="text-input" 
                            name="Address" 
                            title="Address"
                            value={this.state.Address} 
                            onChange={this.handleChange}
                            placeholder="Enter your street address"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">State</label>
                        <Input 
                            className="text-input" 
                            name="State" 
                            title="State"
                            value={this.state.State} 
                            onChange={this.handleChange}
                            placeholder="Enter your state"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">Zipcode</label>
                        <Input 
                            className="text-input" 
                            name="Zipcode" 
                            title="Zipcode"
                            value={this.state.Zipcode} 
                            onChange={this.handleChange}
                            placeholder="Enter your zipcode"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">Phone Number</label>
                        <Input 
                            className="text-input" 
                            name="Phone" 
                            title="Phone"
                            value={this.state.Phone} 
                            onChange={this.handleChange}
                            placeholder="Enter your phone number"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">Email Address</label>
                        <Input 
                            className="text-input" 
                            name="Email" 
                            title="Email"
                            value={this.state.Email} 
                            onChange={this.handleChange}
                            placeholder="Enter your email address"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">GitHub Username</label>
                        <Input 
                            className="text-input" 
                            name="Github" 
                            title="Github"
                            value={this.state.Github} 
                            onChange={this.handleChange}
                            placeholder="Enter your GitHub username"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">Team</label>
                        <Input 
                            className="text-input" 
                            name="Team" 
                            title="Team"
                            value={this.state.Team} 
                            onChange={this.handleChange}
                            placeholder="Enter the team that you are on"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">Skills</label>
                        {this.state.Skills.map((skill, index) => (
                                <div>
                                    <Input 
                                        type="text"
                                        placeholder="Enter a skill"
                                        value={skill}
                                        onChange={this.handleSkillChange(index)}
                                    />
                                    <Button onClick={this.deleteSkill(index)}>Remove</Button>
                                </div>
                            ))}
                        <Button onClick={this.addSkill}>Add</Button>
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">Projects</label>
                        {this.state.Projects.map((project, index) => (
                                <div>
                                    <Input 
                                        type="text"
                                        placeholder="Add a project that you helped with"
                                        value={project}
                                        onChange={this.handleProjectChange(index)}
                                    />
                                    <Button onClick={this.deleteProject(index)}>Remove</Button>
                                </div>
                            ))}
                        <Button onClick={this.addProject}>Add</Button>
                    </Grid>
                    <Grid item md={12}>
                        <label className="display-label">Bio</label>
                        <textarea 
                            className="text-area"
                            rows={6}
                            wrap="soft"
                            name="Bio"
                            title="Bio"
                            value={this.state.Bio}
                            onChange={this.handleChange}
                            placeholder="Say something about yourself"
                            fullWidth={false}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <input 
                            type="file"
                            id="fileUpload"
                            onChange= {this.onDrop}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Button onClick={this.handleSubmit}>Save</Button>
                    </Grid>      
                </Grid>
            </div>
        )
    }
}

export default CreateProfile;