import React from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CourseTableBody from './CoursesTableBody';
import CourseTableHeader from './CoursesTableHeader';
import CourseToolBar from './CoursesToolBar';
import StatusCard from './StatusCard';
import AddCourse from './AddCourse/AddCourse';
import { addCourse } from '../../actions/ControlCourses';
import { percentageToFPO } from '../../utils/GPACalculator';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

const CoursesTable = ({ classes, addCourse, id }) => (
  <Paper className={classes.root}>
    <div>
      <CourseToolBar />
      <StatusCard />
      <AddCourse
        onSubmit={values => {
          addCourse(values, id);
        }}
      />
    </div>
    <div className={classes.tableWrapper}>
      <Table className={classes.table} aria-labelledby="CourseTable">
        <CourseTableHeader />
        <CourseTableBody />
      </Table>
    </div>
  </Paper>
);

const mapStateToProps = state => ({
  id: state.Table.currentData.length + 1
});

const mapDispatchToProps = {
  addCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CoursesTable));
