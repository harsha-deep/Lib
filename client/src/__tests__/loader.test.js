import React from 'react';
import { render } from '@testing-library/react';
import Loader from "../components/Loader";
import '@testing-library/jest-dom';

test('renders Loader component', async () => {
    const { getByTestId } = render(<Loader />);

    const loaderParentElement = getByTestId('loader-parent');
    expect(loaderParentElement).toBeInTheDocument();

    const loaderElement = getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
});
