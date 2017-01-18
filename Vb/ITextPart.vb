Namespace HalloJoe.Spin.Vb

    Interface ITextPart

        ''' <summary>
        ''' Shows a string representation
        ''' </summary>
        ''' <returns></returns>
        ''' <remarks></remarks>
        Function ToString() As String

        ''' <summary>
        ''' Shows original string the TextPart was parsed from
        ''' </summary>
        ''' <returns></returns>
        ''' <remarks></remarks>
        Function ToStructuredString() As String

        ''' <summary>
        ''' Returns total number of variants that can be possibly produced
        ''' </summary>
        ''' <returns></returns>
        ''' <remarks></remarks>
        Function CountVariants() As Decimal

        ''' <summary>
        ''' Returns the minimal number of alternatives of a single part within
        ''' </summary>
        ''' <returns></returns>
        ''' <remarks></remarks>
        Function CountMinWords() As Integer

        ''' <summary>
        ''' Returns the maximal number of alternatives of a single part within
        ''' </summary>
        ''' <returns></returns>
        ''' <remarks></remarks>
        Function CountMaxWords() As Integer

    End Interface

End Namespace


