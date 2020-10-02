import React, { ReactElement } from 'react';
import styles from './SearchBar.module.scss';

import { useQueryCache } from 'react-query';
import {
  Button,
  Card,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Formik, Form } from 'formik';

import { KnowledgeFileFields } from '../../types/types';
import { usePostKnowledgeFile } from '../../backendapi/graphql';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../../redux/auth';
import CodeField from '../CodeField/CodeField';

interface InitialValues {
  regexList: string;
}

const initialValues: InitialValues = {
  regexList: '',
};

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBar: {
      padding: theme.spacing(2),
    },
  })
);

function SearchBar({}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const queryCache = useQueryCache();

  async function onSubmitRegexList(values: InitialValues) {
    dispatch(AuthActionCreators.regexListUpdated(values.regexList.split('\n')));
    queryCache.invalidateQueries('knowledge_file');
  }

  return (
    <div className={styles.filter}>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmitRegexList}
      >
        <Form>
          <Card elevation={3}>
            <Grid container direction="column" className={classes.searchBar}>
              <Grid item>
                <Typography gutterBottom>Regex:</Typography>
              </Grid>
              <Grid item>
                <Card elevation={2}>
                  <CodeField label={'Regex List'} name={'regexList'} />
                </Card>
              </Grid>
            </Grid>
            <Button type="submit" color="primary" fullWidth>
              Search
            </Button>
          </Card>
        </Form>
      </Formik>
    </div>
  );
}

export default SearchBar;
