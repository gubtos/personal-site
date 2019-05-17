import React from 'react';
import axios from 'axios';
import MediaCard from './MediaCard'
import Grid from '@material-ui/core/Grid';
import CustomizedInputBase from './SearchBar';
import logo from '../logo.svg';

export default class Companies extends React.Component {
    state = {
        companies : [],
        searchedCompanies : []
    };

    componentDidMount(){
        axios.get('http://localhost:3000/companies')
                .then(res => {
                    const companies = res.data;
                    this.setState({
                        companies: companies,
                        searchedCompanies : companies
                    });
            });
    }

    handleChange = (e) =>{
        if (e.length > 0){
            const searchedCompanies = this.state.companies.filter(l => {
                let k1 = l.name.toLowerCase().match(e);
                let k2 = l.opportunities.filter(l2 =>{
                    return l2.toLowerCase().match(e);
                });
                let k3 = l.categories.filter(l3 =>{
                    return l3.toLowerCase().match(e);
                });
                let k4 = l.cities.filter(l4 =>{
                    return l4.toLowerCase().match(e);
                });
                if (k4.length > 0 || k2.length > 0 || k1 !== null){
                    return true;
                }
            });
            this.setState({searchedCompanies:searchedCompanies});
        }else{
            this.setState({searchedCompanies:this.state.companies})
        }
    }

    render(){
        return (
            <div>
                <div style={{ marginTop: 10, padding: 10 }}>
                    <Grid container spacing={40} justify="center">
                        <Grid item>
                        {/* <img 
                            src={logo}
                            alt="logo"
                            height="87px"
                            width="100px" /> */}
                            <CustomizedInputBase onChangeInput={this.handleChange}/>
                        </Grid>
                    </Grid>
                </div>
                <div style={{ marginTop: 10, padding: 10 }}>
                    <Grid container spacing={40} justify="center">
                        {this.state.searchedCompanies.map((companie, index) => 
                            <Grid item key={index}>
                                <MediaCard key={index} name={companie.name}
                                    description={companie.description}
                                    site={companie.site}
                                    jobsSite={companie.jobsSite}
                                    categories={companie.categories}
                                    opportunities={companie.opportunities}
                                    cities={companie.cities}
                                    fundation={companie.fundation}></MediaCard>
                            </Grid>
                        )}
                    
                    </Grid>
                </div>
            </div>
        );
    }
}
