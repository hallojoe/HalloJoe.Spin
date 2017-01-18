
Namespace HalloJoe.Spin.Vb

    ''' <summary>
    ''' Just a part of text
    ''' </summary>
    ''' <remarks></remarks>
    Friend Class SimpleText
        Implements ITextPart

        Protected _text As String
        Protected _wordsCount As Integer = -1

        Public Sub New(ByVal text As String)
            Me._text = text
        End Sub

        Public ReadOnly Property WordsCount() As Integer
            Get
                If _wordsCount = -1 Then _wordsCount = TextHelper.WordsCount(_text)
                Return _wordsCount
            End Get
        End Property

        Public Overrides Function ToString() As String Implements ITextPart.ToString
            Return _text
        End Function

        Public Function ToStructuredString() As String Implements ITextPart.ToStructuredString
            Return _text
        End Function

        Public Function CountVariants() As Decimal Implements ITextPart.CountVariants
            Return 1
        End Function

        Public Function CountMinWords() As Integer Implements ITextPart.CountMinWords
            Return Me.WordsCount
        End Function

        Public Function CountMaxWords() As Integer Implements ITextPart.CountMaxWords
            Return Me.WordsCount
        End Function

        Public Shared ReadOnly Empty As New SimpleText(String.Empty)

    End Class

End Namespace
